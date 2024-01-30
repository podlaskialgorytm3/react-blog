import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth } from "../../shared/hooks/useAuth";
import { Error } from "../../shared/components/error";
import { AddTagForm } from "../../features/tags/components/add-tag-form";
export const AddTag = () => {
    const { auth } = useAuth();
    return (_jsx(_Fragment, { children: auth ? _jsx(AddTagForm, {}) : _jsx(Error, {}) }));
};
