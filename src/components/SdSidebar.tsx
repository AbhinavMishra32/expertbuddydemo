"use client"

import { Brain, CircuitBoardIcon, BrainCircuit, Briefcase, Calendar, ChevronUp, CircuitBoard, HelpingHand, Home, Settings, User, User2, BedDouble, Lightbulb, StarsIcon, GrapeIcon, IndentIncrease, DumbbellIcon as BicepsFlexed, Dumbbell, Search, BlocksIcon, Route, RouteIcon, HardHat, GraduationCap, Volume2, VolumeX, Sun, Moon } from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation";
import ThemeSelectorButton from './ThemeSelectorButton';
import { UserButton, useUser } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import UserProfileButton from './UserProfileButton';

const sidebarRoutes = [
    {
        title: "AI Career Roadmap",
        url: "/create",
        icon: RouteIcon,
    },
    {
        title: 'Todos',
        url: '/todos',
        icon: BlocksIcon,
    }
]

export function SdSidebar() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const url = usePathname();
    const { theme } = useTheme();

    const handleSidebarClick = (index: number) => {
        const items = sidebarRoutes;
        if (index < items.length) {
            router.push(items[index].url);
        }
    };

    return (
        <>
            <Sidebar className="duration-70000 overflow-hidden shadow-xl hover:shadow-2xl transition-all ease-in">
                <SidebarHeader className="p-2 dark:bg-neutral-900">
                    <div className="flex items-center gap-2">
                        <h3 className='text-2xl'>Logo</h3>
                    </div>
                </SidebarHeader>
                <SidebarContent className="dark:bg-neutral-950">
                    <SidebarGroup>
                        {/* <SidebarGroupLabel>Pages</SidebarGroupLabel> */}
                        <SidebarGroupContent>
                            {isLoaded && (
                                <SidebarMenu>
                                    {sidebarRoutes.map((item, index) => (
                                        <SidebarMenuItem key={item.title} className="px-1">
                                            <SidebarMenuButton asChild isActive={url === item.url || (item.url !== '/' && url.startsWith(item.url) && !url.startsWith(`${item.url}training`))} className="py-5 pl-4 rounded-xl" onClick={() => handleSidebarClick(index)}>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            )}
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <ThemeSelectorButton />
                </SidebarContent>
                <SidebarFooter className='border-t-2 dark:bg-neutral-900'>
                    <UserProfileButton />
                </SidebarFooter>
            </Sidebar>
        </>
    )
}

