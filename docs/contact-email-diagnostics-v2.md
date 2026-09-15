# Contact email diagnostics

The contact endpoint distinguishes:

- `stored: false`: the request was not persisted.
- `stored: true, notification: accepted`: SMTP accepted the message after DATA. This is not proof of Inbox delivery.
- `stored: true, notification: failed`: the request was persisted but SMTP failed.

Every request has a `requestId`. SMTP diagnostics record the request ID, stage, host, port, error name, message, and code without logging secrets or message bodies.

Stages: `tls_connect`, `greeting`, `ehlo`, `auth_login`, `auth_username`, `auth_password`, `mail_from`, `rcpt_to`, `data_command`, `data_body`, `quit`.
