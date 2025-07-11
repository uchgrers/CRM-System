import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./state_manager/store";

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()