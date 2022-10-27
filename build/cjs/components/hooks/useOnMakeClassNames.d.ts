export interface OnMakeClassNames {
    internalClassNames: string[];
    className?: string;
}
export declare const useOnMakeClassNames: (props: OnMakeClassNames) => {
    rootClassName: string;
};
