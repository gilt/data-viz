import hotWare from 'webpack-hot-middleware';

export default function hotMiddleware (compiler, opts) => {
  const action = hotWare(compiler, opts)
  return async (ctx, next) => {
    await action(ctx.req, {
      end: (content) => {
        ctx.body = content
      },
      setHeader: ctx.set.bind(ctx)
    }, next)
  }
};
