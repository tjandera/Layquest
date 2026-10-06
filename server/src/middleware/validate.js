import { HttpError } from '../utils/httpError.js';

/**
 * validate(zodSchema, 'body' | 'query' | 'params')
 * Parsed result is placed on req.validated[source]. (req.query is read-only in Express 5.)
 */
export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(new HttpError(400, 'Validation failed', result.error.issues));
    }
    req.validated = { ...req.validated, [source]: result.data };
    return next();
  };
