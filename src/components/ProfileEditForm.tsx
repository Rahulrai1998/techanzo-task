import React, { useState, type Dispatch, type FC, type SetStateAction } from 'react'
import { Stack, Button, Typography, Chip } from '@mui/material'
import type { LanguageType, MyAccountProfileData } from '../store/data'
import styled from '@emotion/styled'
import plus from "../assets/plus.png";
import { v4 as uuidv4 } from "uuid";

interface ProfileEditFormProps {
    data: MyAccountProfileData | undefined
    handleDataUpdate: (data: FormData) => void
    setOpen: Dispatch<SetStateAction<boolean>>
}

export type FormData = {
    name: string;
    title: string;
    email: string;
    phone: string;
    languages: LanguageType[];
    image: File | null;
};


const ProfileEditForm: FC<ProfileEditFormProps> = ({ data, setOpen, handleDataUpdate }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { fullName, professionalTitle, email, whatsapp, avatar } = data ?? {}
    const [showAddLang, setShowLang] = useState(true)
    const [language, setLanguage] = useState('');
    const [languagesArray, setLanguagesArray] = useState<LanguageType[]>([]);

    const [formData, setFormData] = useState<FormData>({
        name: fullName as string,
        title: professionalTitle as string,
        email: email as string,
        phone: whatsapp as any,
        languages: [],
        image: null,

    });



    const handleAddLanguage = () => {
        const trimmed = language.trim();
        if (!trimmed) return;

        const updatedLanguages = [...languagesArray, { id: uuidv4(), name: trimmed }];
        setLanguagesArray(updatedLanguages);
        setLanguage('');

        setFormData(prev => ({ ...prev, languages: updatedLanguages }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(value)
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleDataUpdate(formData)
        setOpen(false)
        console.log('Form submitted:', formData);
    };

    return (
        <Parent>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: 'flex-start', gap: 5, alignItems: "center" }}>
                <img src={previewUrl || ""} alt="Profile Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', background: "#dfdfdf" }} />

                <label>
                    <input className='img-input' style={{
                        background: "linear-gradient(104.11deg, #151C67 -0.52%, #2A38CD 111.07%)",
                        borderRadius: "16px", padding: "12px 24px", cursor: "pointer"
                    }} type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <div>
                    <button onClick={() => setPreviewUrl(null)} style={{ borderRadius: "16px", padding: "12px 26px", border: "2px solid rgba(21, 28, 103, 0.2)", background: "white", cursor: "pointer" }}>Delete</button></div>
            </div>
            <Form>
                <InputContainer>
                    <label>
                        <Label>Name</Label>
                        <Input name="name"
                            type="text" value={formData?.name} onChange={handleChange} />
                    </label>
                </InputContainer>

                <InputContainer>
                    <label>
                        <Label>Professional Title</Label>
                        <Input name='title' type="text" value={formData?.title} onChange={handleChange} />
                    </label>
                </InputContainer >

                <InputContainer>
                    <label>
                        <Label>Email Address</Label>
                        <Input name='email' type="email" value={formData?.email} onChange={handleChange} />
                    </label>
                </InputContainer >

                <InputContainer>
                    <label>
                        <Label>Phone Number</Label>
                        <Input name='phone' type="tel" value={formData?.phone} onChange={handleChange} />
                    </label>
                </InputContainer >

                <InputWrapper>
                    <LangChips>{languagesArray?.map((lang) => <Chip key={lang?.id} label={lang?.name} />)}</LangChips>
                    <StyledInput
                        disabled={false}
                        readOnly={false}
                        name='languages'
                        type="text"
                        placeholder="Add a language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    <AddButton type="button" onClick={handleAddLanguage}>+</AddButton>
                </InputWrapper>

            </Form >
            <Stack flexDirection={"row"} justifyContent={"flex-end"} gap={2}>
                <Button type='submit' onClick={(e: any) => handleSubmit(e)} sx={{ borderRadius: "16px", padding: "9px 20px", fontSize: "13px", background: "linear-gradient(104.11deg, #151C67 -0.52%, #2A38CD 111.07%)" }} variant="contained">Save</Button>
            </Stack>
        </Parent>
    )
}

export default ProfileEditForm

const Parent = styled("div")({

})

const Label = styled(Typography)({
    marginTop: "10px"

})

const InputContainer = styled("div")({
    width: "90%"
})

const Form = styled("form")({
    width: "100%",
    margin: "1.6rem 0",
    display: "grid",
    gap: "15px",
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr))",
    //if there is only one element at last row, it will take full width
    "& > :nth-last-child(1):nth-child(odd)": {
        gridColumn: "1 / -1"
    }
})

const Input = styled("input")({
    padding: "16px",
    border: "2px solid rgba(21, 28, 103, 0.2)",
    borderRadius: "16px",
    width: "100%",
    margin: "17px 0"
})

const InputWrapper = styled("div")({
    position: "relative",
    width: "90%",
});

const StyledInput = styled("input")({
    width: "100%",
    padding: "16px 48px 16px 16px", // extra right padding for button
    border: "2px solid rgba(21, 28, 103, 0.2)",
    borderRadius: "16px",
    fontSize: "14px",
});

const AddButton = styled("button")({
    position: "absolute",
    right: "5px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#2A38CD",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    fontSize: "18px",
    cursor: "pointer",
});

const LangChips = styled("div")({
    display: "flex",
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "white",
    color: "white",
    gap: 2
})