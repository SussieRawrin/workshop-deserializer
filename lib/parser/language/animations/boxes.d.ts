/// <reference types="parsimmon" />
declare const boxes: {
    group: (x: any) => import("parsimmon").Parser<{
        [x: number]: any;
    }>;
    variables: (x: any) => import("parsimmon").Parser<{}>;
    methods: (x: any) => import("parsimmon").Parser<{}>;
    code: (x: any) => import("parsimmon").Parser<{}[]>;
};
export { boxes, };
//# sourceMappingURL=boxes.d.ts.map