export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

/** Placeholder handler used by every controller stub until it is built. */
export const notImplemented = (name) => (_req, res) =>
  res.status(501).json({ error: 'Not implemented', handler: name });
