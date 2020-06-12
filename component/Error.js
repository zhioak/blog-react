import { Button, Result } from 'antd'

export const ERROR_ENUM = {
    404: {
        state: 404,
        code: '404',
        info: 'Sorry, the page you visited does not exist.'
    }
}

export default ({ error }) => {
    let { state = 'warning', code, info } = error
    return (
        <Result
            status={state}
            title={code}
            subTitle={info}
            extra={<Button type="primary" onClick={() => {

                let history = window.history

                1 === history.length ? history.go(0) : history.back()


            }} >Go Back</Button>}
        />
    )
}