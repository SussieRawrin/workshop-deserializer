/// <reference types="parsimmon" />
declare const words: {
    description: (x: any) => import("parsimmon").Parser<{}>;
    gameSetting: (x: any) => import("parsimmon").Parser<{
        [x: number]: any;
    }>;
};
export { words, };
//# sourceMappingURL=words.d.ts.map