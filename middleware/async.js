/**
 * @function asyncMiddleware
 * @param {Callback} handler - The logic to "try" in the asyncronous process
 * This piece of middleware handles all the generic try/catch scenarios scattered
 * through out the app. It simply receives the asyncronous logic in a callback and
 * returns it back to its source wrapped in the try/catch, within an asyncronous 
 * callback.
 * 
 */
function asyncMiddleware(handler) {
    return async (req, res, next) => {
        /** Handler is the async logic in a callback */
        try { await handler(req, res); }
        /** Pass the error through to the next middleware, the errorHandler */
        catch (err) { next(err); }
    }
}

export default asyncMiddleware;