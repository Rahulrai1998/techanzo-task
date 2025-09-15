import React, {
    useState,
    type Dispatch,
    type FC,
    type SetStateAction,
} from "react";
import { Stack, Button, Typography, Chip } from "@mui/material";
import type { LanguageType, MyAccountProfileData } from "../store/data";
import styled from "@emotion/styled";
import plus from "../assets/plus.png";
import upload from "../assets/upload.png";
import { v4 as uuidv4 } from "uuid";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import toast from "react-hot-toast";

interface ProfileEditFormProps {
    data: MyAccountProfileData | undefined;
    handleDataUpdate: (data: FormData) => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export type FormData = {
    name: string;
    title: string;
    email: string;
    phone: string;
    languages: LanguageType[];
    image: File | null | undefined | string;
};

const ProfileEditForm: FC<ProfileEditFormProps> = ({
    data,
    setOpen,
    handleDataUpdate,
}) => {
    const { fullName, professionalTitle, email, whatsapp, avatar, languages } =
        data ?? {};
    const [previewUrl, setPreviewUrl] = useState<string | null | File>(
        avatar || null
    );
    const [language, setLanguage] = useState("");
    const [languagesArray, setLanguagesArray] = useState<LanguageType[]>([]);

    const [formData, setFormData] = useState<FormData>({
        name: fullName as string,
        title: professionalTitle as string,
        email: email as string,
        phone: whatsapp as any,
        languages: languages as LanguageType[],
        image: previewUrl,
    });

    const handleAddLanguage = () => {
        try {
            const trimmed = language.trim();
            if (!trimmed) return;

            const updatedLanguages = [
                ...languagesArray,
                { id: uuidv4(), name: trimmed },
            ];

            setLanguagesArray(updatedLanguages);
            setLanguage("");
            setFormData((prev) => ({
                ...prev,
                languages: updatedLanguages,
            }));
        } catch (error) {
            toast.error("Error adding language.");
        }
    };

    const handleLangChipRemove = (id: string) => {
        try {
            if (!id || !languagesArray?.length) return;

            const updatedLanguages = languagesArray.filter((lang) => lang?.id !== id);
            setLanguagesArray(updatedLanguages);
            setFormData((prev) => ({
                ...prev,
                languages: updatedLanguages,
            }));
        } catch (error) {
            toast.error("Error removing language");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const { name, value } = e.target;
            console.log(value);
            setFormData((prev) => ({ ...prev, [name]: value }));
        } catch (error) {
            toast.error("Error updating form data");
        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setFormData((prev) => ({ ...prev, image: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error("Error handling image upload:");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("form data", formData)
            handleDataUpdate(formData);
            setOpen(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Something went wrong while updating the profile.");
        }
    };

    return (
        <Parent>
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: 8,
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        background: "#dfdfdf",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl as string}
                            alt="Profile Preview"
                            style={{
                                width: previewUrl ? "100%" : "40px",
                                height: previewUrl ? "100%" : "40px",
                                objectFit: previewUrl ? "cover" : "contain",
                            }}
                        />
                    ) : (
                        <CameraAltIcon />
                    )}
                </div>

                <label htmlFor="img-upload" className="custom-upload-btn">
                    <img src={upload} alt="upload icon" className="upload-icon" />
                    Upload Profile Image
                </label>
                <input
                    id="img-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />

                {previewUrl && (
                    <div>
                        <button
                            onClick={() => {
                                setPreviewUrl(null)
                                setFormData((prev) => ({ ...prev, image: null }));
                            }}
                            style={{
                                borderRadius: "16px",
                                padding: "12px 26px",
                                border: "2px solid rgba(21, 28, 103, 0.2)",
                                background: "white",
                                cursor: "pointer",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <Form>
                <InputContainer>
                    <label htmlFor="name">
                        <Label>NAME</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData?.name}
                            onChange={handleChange}
                        />
                    </label>
                </InputContainer>

                <InputContainer>
                    <label htmlFor="title">
                        <Label>PROFESSIONAL TITLE</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formData?.title}
                            onChange={handleChange}
                        />
                    </label>
                </InputContainer>

                <InputContainer>
                    <label htmlFor="email">
                        <Label>EMAIL ADDRESS</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            value={formData?.email}
                            onChange={handleChange}
                        />
                    </label>
                </InputContainer>

                <InputContainer>
                    <label htmlFor="phone">
                        <Label>PHONE NUMBER</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData?.phone}
                            onChange={handleChange}
                        />
                    </label>
                </InputContainer>

                <InputWrapper>
                    <label htmlFor="language-input">
                        <Label className="input-label">LANGUAGES SPOKEN</Label>
                        <LanguageInput>
                            <LangChips>
                                {languagesArray?.map((lang) => (
                                    <Chip
                                        key={lang?.id}
                                        label={lang?.name}
                                        onDelete={() => handleLangChipRemove(lang?.id as string)}
                                    />
                                ))}
                            </LangChips>
                            <StyledInput
                                id="language-input"
                                disabled={false}
                                readOnly={false}
                                name="languages"
                                type="text"
                                placeholder="Add a language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                            <AddButton type="button" onClick={handleAddLanguage}>
                                <img src={plus} alt="" />
                            </AddButton>
                        </LanguageInput>
                    </label>
                </InputWrapper>
            </Form>
            <Stack flexDirection={"row"} justifyContent={"flex-end"} gap={2}>
                <Button sx={{
                    borderRadius: "16px", fontSize: "13px", padding: "9px 20px", border: "1px solid rgba(21, 28, 103, 0.2)", color: "rgba(21, 28, 103, 0.4)"
                }} variant='outlined' onClick={() => { setOpen(false) }}>Back</Button>
                <Button
                    type="submit"
                    onClick={(e: any) => handleSubmit(e)}
                    sx={{
                        borderRadius: "16px",
                        padding: "9px 20px",
                        fontSize: "13px",
                        background:
                            "linear-gradient(104.11deg, #151C67 -0.52%, #2A38CD 111.07%)",
                    }}
                    variant="contained"
                >
                    Save
                </Button>
            </Stack>
        </Parent >
    );
};

export default ProfileEditForm;

const Parent = styled("div")({
    "& .custom-upload-btn": {
        background: "linear-gradient(104.11deg, #151C67 -0.52%, #2A38CD 111.07%)",
        borderRadius: "16px",
        padding: "12px 24px",
        cursor: "pointer",
        color: "white",
        fontWeight: "bold",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
    },
    "& .upload-icon": {
        paddingRight: "4px",
    },
});

const Label = styled(Typography)({
    marginTop: "10px",
});

const InputContainer = styled("div")({
    width: "90%",
});

const Form = styled("form")({
    width: "100%",
    margin: "1.6rem 0",
    display: "grid",
    gap: "15px",
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr))",
    //if there is only one element at last row, it will take full width
    "& > :nth-last-child(1):nth-child(odd)": {
        gridColumn: "1 / -1",
    },
});

const Input = styled("input")({
    padding: "16px",
    border: "2px solid rgba(21, 28, 103, 0.2)",
    borderRadius: "16px",
    width: "100%",
    margin: "17px 0",
});

const InputWrapper = styled("div")({
    position: "relative",
    width: "90%",
});

const StyledInput = styled("input")({
    width: "fit-content",
    // padding: "16px 48px 16px 16px", // extra right padding for button
    border: "none",
    // fontSize: "14px",
    marginLeft: "10px",
});

const AddButton = styled("button")({
    color: "white",
    border: "none",
    background: "none",
    cursor: "pointer",
    marginLeft: "10px",
    textAlign: "center",
    img: {
        objectFit: "cover",
        textAlign: "center",
    },
});

const LangChips = styled("div")({
    display: "flex",
    background: "white",
    color: "white",
    gap: 2,
});

const LanguageInput = styled("div")({
    display: "flex",
    width: "100%",
    padding: "10px",
    border: "2px solid rgba(21, 28, 103, 0.2)",
    borderRadius: "16px",
    fontSize: "14px",
    alignItems: "center",
    "input:focus": {
        outline: "none",
        boxShadow: "none",
    },
});
