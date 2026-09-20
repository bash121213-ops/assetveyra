'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { I18nText } from '@/components/LocaleShell';
import AssetImageUploader from '@/components/AssetImageUploader';
import PropertyDetailsFields from '@/components/PropertyDetailsFields';
import ListingLocationFields from '@/components/ListingLocationFields';
import ListingPreview from '@/components/ListingPreview';
import { createClient } from '@/lib/supabase/client';
import { createAssetSubmission, finalizeAssetImageUploads, prepareAssetImageUploads } from '@/app/submit/actions';

export default function SubmitPropertyForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');

    try {
      const form = event.currentTarget;
      const metadata = new FormData(form);
      const { assetId } = await createAssetSubmission(metadata);

      let failed = 0;
      if (files.length) {
        const { grants } = await prepareAssetImageUploads(assetId, files.map((file) => ({ name: file.name, type: file.type, size: file.size })));
        const supabase = createClient();
        const uploaded: Array<{ path: string; name: string; type: string; size: number }> = [];

        for (let index = 0; index < grants.length; index += 1) {
          const grant = grants[index];
          const file = files[index];
          const { error: uploadError } = await supabase.storage.from('property-images').uploadToSignedUrl(grant.path, grant.token, file, { contentType: file.type, upsert: false });
          if (uploadError) {
            failed += 1;
            continue;
          }
          uploaded.push({ path: grant.path, name: grant.name, type: grant.type, size: grant.size });
        }

        if (uploaded.length) await finalizeAssetImageUploads(assetId, uploaded);
      }

      router.push(`/workspace/assets?submitted=1${failed ? `&images_failed=${failed}` : ''}`);
    } catch (submitError) {
      console.error('Submit property failed', submitError);
      setError('Unable to submit this property. Please try again.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form-grid" data-listing-form>
      <div className="full"><div className="eyebrow"><I18nText id="BASIC INFORMATION"/></div></div>
      <label><I18nText id="Listing title"/><input name="title" required maxLength={200}/></label>
      <div className="full"><div className="eyebrow"><I18nText id="LOCATION"/></div></div>
      <ListingLocationFields/>
      <div className="full"><div className="eyebrow"><I18nText id="PRICING"/></div></div>
      <label><I18nText id="Area m²"/><input name="area_sqm" type="number" min="0.01" step="0.01" required/></label>
      <label><I18nText id="Asking price"/><input name="asking_price" type="number" min="0.01" step="0.01" required/></label>
      <label><I18nText id="Currency"/><input name="currency" defaultValue="USD" maxLength={3} required/></label>
      <div className="full"><div className="eyebrow"><I18nText id="PROPERTY DETAILS"/></div></div>
      <PropertyDetailsFields initialAssetType="residential"/>
      <div className="full"><div className="eyebrow"><I18nText id="MEDIA"/></div><AssetImageUploader inputName={null} onPreparedFiles={setFiles}/></div>
      <div className="full"><div className="eyebrow"><I18nText id="PREVIEW"/></div><ListingPreview images={files}/></div>
      {error && <div className="full form-error" role="alert">{error}</div>}
      <div className="full"><button className="button primary" disabled={busy}>{busy ? <I18nText id="Submitting…"/> : <I18nText id="Submit Asset for Verification"/>}</button></div>
    </form>
  );
}
