import ThemeSelectorButton from "@/components/ThemeSelectorButton";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
        {/* <ThemeSelectorButton /> */}
            {children}
        </>
    )
}