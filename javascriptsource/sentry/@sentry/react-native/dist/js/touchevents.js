import { addBreadcrumb } from "@sentry/core";
import { Severity } from "@sentry/types";
import * as React from "react";
import { StyleSheet, View } from "react-native";
const touchEventStyles = StyleSheet.create({
    wrapperView: {
        flex: 1,
    },
});
const DEFAULT_BREADCRUMB_CATEGORY = "touch";
const DEFAULT_BREADCRUMB_TYPE = "user";
const DEFAULT_MAX_COMPONENT_TREE_SIZE = 20;
/**
 * Boundary to log breadcrumbs for interaction events.
 */
class TouchEventBoundary extends React.Component {
    constructor() {
        super(...arguments);
        this._isNameIgnored = (name) => {
            let ignoreNames = this.props.ignoreNames || [];
            // eslint-disable-next-line deprecation/deprecation
            if (this.props.ignoredDisplayNames) {
                // This is to make it compatible with prior version.
                // eslint-disable-next-line deprecation/deprecation
                ignoreNames = [...ignoreNames, ...this.props.ignoredDisplayNames];
            }
            return ignoreNames.some((ignoreName) => (typeof ignoreName === "string" && name === ignoreName) ||
                (ignoreName instanceof RegExp && name.match(ignoreName)));
        };
        // Originally was going to clean the names of any HOCs as well but decided that it might hinder debugging effectively. Will leave here in case
        // private readonly _cleanName = (name: string): string =>
        //   name.replace(/.*\(/g, "").replace(/\)/g, "");
        this._onTouchStart = (e) => {
            if (e._targetInst) {
                let currentInst = e._targetInst;
                let activeDisplayName = null;
                const componentTreeNames = [];
                while (currentInst &&
                    // maxComponentTreeSize will always be defined as we have a defaultProps. But ts needs a check so this is here.
                    this.props.maxComponentTreeSize &&
                    componentTreeNames.length < this.props.maxComponentTreeSize) {
                    if (currentInst.elementType) {
                        if (
                        // If the loop gets to the boundary itself, break.
                        currentInst.elementType.displayName ===
                            TouchEventBoundary.displayName) {
                            break;
                        }
                        if (typeof currentInst.elementType.displayName === "string" &&
                            !this._isNameIgnored(currentInst.elementType.displayName)) {
                            const { displayName } = currentInst.elementType;
                            if (activeDisplayName === null) {
                                activeDisplayName = displayName;
                            }
                            componentTreeNames.push(displayName);
                        }
                        else if (typeof currentInst.elementType.name === "string" &&
                            !this._isNameIgnored(currentInst.elementType.name)) {
                            componentTreeNames.push(currentInst.elementType.name);
                        }
                    }
                    currentInst = currentInst.return;
                }
                if (componentTreeNames.length > 0 || activeDisplayName) {
                    this._logTouchEvent(componentTreeNames, activeDisplayName);
                }
            }
        };
    }
    /**
     *
     */
    render() {
        return (<View style={touchEventStyles.wrapperView} onTouchStart={this._onTouchStart}>
        {this.props.children}
      </View>);
    }
    /**
     *
     */
    _logTouchEvent(componentTreeNames, displayName) {
        addBreadcrumb({
            category: this.props.breadcrumbCategory,
            data: { componentTree: componentTreeNames },
            level: Severity.Info,
            message: displayName
                ? `Touch event within element: ${displayName}`
                : `Touch event within component tree`,
            type: this.props.breadcrumbType,
        });
    }
}
TouchEventBoundary.displayName = "__Sentry.TouchEventBoundary";
TouchEventBoundary.defaultProps = {
    breadcrumbCategory: DEFAULT_BREADCRUMB_CATEGORY,
    breadcrumbType: DEFAULT_BREADCRUMB_TYPE,
    ignoreNames: [],
    maxComponentTreeSize: DEFAULT_MAX_COMPONENT_TREE_SIZE,
};
/**
 * Convenience Higher-Order-Component for TouchEventBoundary
 * @param WrappedComponent any React Component
 * @param boundaryProps TouchEventBoundaryProps
 */
const withTouchEventBoundary = (InnerComponent, boundaryProps) => {
    const WrappedComponent = (props) => (<TouchEventBoundary {...boundaryProps}>
      <InnerComponent {...props}/>
    </TouchEventBoundary>);
    WrappedComponent.displayName = "WithTouchEventBoundary";
    return WrappedComponent;
};
export { TouchEventBoundary, withTouchEventBoundary };
//# sourceMappingURL=touchevents.js.map