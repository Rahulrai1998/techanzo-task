import { createContext, useContext, useState } from "react";
import type { MyAccountProfileData } from "./data";
import { withIds } from "./data";
import type { FormData } from "../components/ProfileEditForm";
import toast from "react-hot-toast";


interface DataContextType {
    profileData: MyAccountProfileData;
    handleDataUpdate: (data: FormData) => void;
    openForm: boolean;
    setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataContext = createContext<DataContextType | null | undefined>(undefined);


const ContextProvider = ({ children }: any) => {
    const initialProfileData = withIds?.at(6)?.tabPanelData?.at(0)?.panelData as MyAccountProfileData
    const [profileData, setProfileData] = useState(initialProfileData)
    const [openForm, setOpenForm] = useState(false)

    const { avatar } = profileData ?? {}

    const handleDataUpdate = ({
        name,
        title,
        email,
        phone,
        image,
        languages,
    }: FormData) => {
        try {
            const newObj = {
                ...profileData,
                fullName: name,
                professionalTitle: title,
                email,
                whatsapp: phone,
                avatar:
                    typeof image === "string" && image === avatar || !image
                        ? image
                        : URL.createObjectURL(image as any),
                languages,
            };
            setProfileData(newObj as any);
            toast.success("Profile Updated!!");
        } catch (error) {
            console.error("Error updating profile data:", error);
            toast?.error("Profile update failed!!")
        }
    };

    console.log(profileData)
    return (
        <DataContext value={{ profileData, handleDataUpdate, openForm, setOpenForm } as any}>
            {children}
        </DataContext>
    );
};

export default ContextProvider;

export const useProfileContext = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error("useProfileContext must be used within a ContextProvider");
    return context;
};
