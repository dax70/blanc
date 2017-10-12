type ButtonEvent = {

};

export interface ButtonProps {
    text: string;
    click?: (e: ButtonEvent) => void;
    iconName?: string;
}