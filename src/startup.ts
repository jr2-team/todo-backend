import ExpressApp from './ExpressApp'

const initExpressApp = async () => {
    await new ExpressApp().start()
}

export default initExpressApp()