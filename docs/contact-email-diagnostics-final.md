# Contact email diagnostics

SMTP `data_body` success means the SMTP server accepted the message. It does not prove Inbox delivery. The contact API reports persistence separately from notification status and attaches a requestId to each request. SMTP diagnostics identify the request and stage without logging secrets or message bodies.
