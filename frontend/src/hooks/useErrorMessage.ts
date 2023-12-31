import { message } from "antd";
import { useEffect, useState } from "react";

const useErrorMessage = () => {
    const [errors, setErrors] = useState<string>();
    const [messageApi, context] = message.useMessage();

    useEffect(() => {
        if (errors){
            messageApi.error(`${errors}`);
            setErrors(undefined);
        }
    }, [errors, messageApi])

    return {
        setErrors,
        context
    }
}

export default useErrorMessage;