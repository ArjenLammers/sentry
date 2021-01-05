import * as React from "react";
export declare type TouchEventBoundaryProps = {
    /**
     * The category assigned to the breadcrumb that is logged by the touch event.
     */
    breadcrumbCategory?: string;
    /**
     * The type assigned to the breadcrumb that is logged by the touch event.
     */
    breadcrumbType?: string;
    /**
     * The max number of components to display when logging a touch's component tree.
     */
    maxComponentTreeSize?: number;
    /**
     * Component name(s) to ignore when logging the touch event. This prevents unhelpful logs such as
     * "Touch event within element: View" where you still can't tell which View it occurred in.
     */
    ignoreNames?: Array<string | RegExp>;
    /**
     * Deprecated, use ignoreNames instead
     * @deprecated
     */
    ignoredDisplayNames?: Array<string | RegExp>;
};
/**
 * Boundary to log breadcrumbs for interaction events.
 */
declare class TouchEventBoundary extends React.Component<TouchEventBoundaryProps> {
    static displayName: string;
    static defaultProps: Partial<TouchEventBoundaryProps>;
    /**
     *
     */
    render(): React.ReactNode;
    /**
     *
     */
    private _logTouchEvent;
    private _isNameIgnored;
    private _onTouchStart;
}
/**
 * Convenience Higher-Order-Component for TouchEventBoundary
 * @param WrappedComponent any React Component
 * @param boundaryProps TouchEventBoundaryProps
 */
declare const withTouchEventBoundary: (InnerComponent: React.ComponentType<any>, boundaryProps: TouchEventBoundaryProps) => React.FunctionComponent;
export { TouchEventBoundary, withTouchEventBoundary };
//# sourceMappingURL=touchevents.d.ts.map