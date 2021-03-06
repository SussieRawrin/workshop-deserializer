import { Parser } from 'parsimmon';
declare const values: {
    quote: () => Parser<{}>;
    mapHeroName: () => Parser<string>;
    gameSettingName: () => Parser<string>;
    gameSettingValue: (x: any) => Parser<string>;
    workshopSettingName: (x: any) => Parser<string>;
    variableValue: (x: any) => Parser<string>;
    integer: () => Parser<number>;
    float: () => Parser<number>;
    digits: () => Parser<string>;
    codeX: () => Parser<unknown>;
};
export { values, };
//# sourceMappingURL=values.d.ts.map