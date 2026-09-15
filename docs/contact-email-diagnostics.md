# Contact email diagnostics

The contact endpoint distinguishes three outcomes:

- `stored: false`: the contact request was not persisted.
- `stored: true, notification: accepted`: the SMTP server accepted the message after the DATA command. This does not mean Inbox delivery.
- `stored: true, notification: failed`: the contact request was persisted, but the SMTP attempt failed.

Every request receives a `requestId`. SMTP diagnostics log the request ID, SMTP stage, host, port, error name, message, and code. Secrets and message bodies are not logged.

SMTP stages are:

`tls_connect` → `greeting` → `ehlo` → `auth_login` → `auth_username` → `auth_password` → `mail_from` → `rcpt_to` → `data_command` → `data_body` → `quit`

A `250` response from `data_body` means SMTP acceptance only. Delivery to the recipient mailbox must be verified separately through the recipient mailbox/provider.
