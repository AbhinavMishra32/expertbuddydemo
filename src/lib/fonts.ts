import {Hubot_Sans, DM_Sans, Manrope} from 'next/font/google';


export const hubotSans = Hubot_Sans({
    weight: '400', 
    style: 'normal',
    subsets: ['latin', 'latin-ext', 'vietnamese']
});

export const DMSans = DM_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700'], 
    style: 'normal',
    subsets: ['latin', 'latin-ext']
})

export const manrope = Manrope({
    weight: ['400', '500', '600', '700'],
    style: 'normal',
    subsets: ['latin', 'latin-ext']
})