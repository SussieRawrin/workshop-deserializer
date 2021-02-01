/// <reference types="parsimmon" />
declare const parsers: {
    _: () => import("parsimmon").Parser<string>;
    __: () => import("parsimmon").Parser<string>;
    workshopScript: (x: any) => import("parsimmon").Parser<any>;
    group: (x: any) => import("parsimmon").Parser<{
        [x: number]: any;
    }>;
    variables: (x: any) => import("parsimmon").Parser<{}>;
    methods: (x: any) => import("parsimmon").Parser<{}>;
    code: (x: any) => import("parsimmon").Parser<{}[]>;
    description: (x: any) => import("parsimmon").Parser<{}>;
    gameSetting: (x: any) => import("parsimmon").Parser<{
        [x: number]: any;
    }>;
    quote: () => import("parsimmon").Parser<{}>;
    mapHeroName: () => import("parsimmon").Parser<string>;
    gameSettingName: () => import("parsimmon").Parser<string>;
    gameSettingValue: (x: any) => import("parsimmon").Parser<string>;
    workshopSettingName: (x: any) => import("parsimmon").Parser<string>;
    variableValue: (x: any) => import("parsimmon").Parser<string>;
    integer: () => import("parsimmon").Parser<number>;
    float: () => import("parsimmon").Parser<number>;
    digits: () => import("parsimmon").Parser<string>;
    codeX: () => import("parsimmon").Parser<unknown>;
};
export { parsers, };
//# sourceMappingURL=index.d.ts.map