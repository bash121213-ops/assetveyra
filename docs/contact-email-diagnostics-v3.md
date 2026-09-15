# Contact email diagnostics

SMTP `data_body` success means the SMTP server accepted the message. It does not prove Inbox delivery.

The endpoint returns `stored` and `notification` separately and attaches a `requestId` to each request. SMTP diagnostics identify the request and stage without logging secrets or message bodies.
