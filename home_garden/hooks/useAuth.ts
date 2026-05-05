import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export function useAuth() {
    const auth = useSelector((state: RootState) => state.auth);
    return auth;
}