import {useState} from "react";

function withForm(WrappedComponent, initialForm) {
    function WrapperComponent(props) {
        const [form, setForm] = useState(initialForm);

        function addProduct() {
            setForm(initialForm);
        }

        return <WrappedComponent form {...props} />
    }
}