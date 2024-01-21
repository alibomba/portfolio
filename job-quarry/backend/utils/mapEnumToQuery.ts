import { ContractType, Level, WorkMode } from "../types";

const levelMap = new Map([
    ['JUNIOR', 'Junior'],
    ['MID', 'Mid'],
    ['SENIOR', 'Senior']
]);

const contractTypeMap = new Map([
    ['TYMCZASOWA', 'Tymczasowa'],
    ['UMOWA_O_PRACE', 'Umowa o Pracę'],
    ['UMOWA_O_DZIELO', 'Umowa o dzieło'],
    ['UMOWA_ZLECENIE', 'Umowa zlecenie'],
    ['PRAKTYKI_ZAWODOWE', 'Praktyki zawodowe'],
    ['B2B', 'B2B'],
    ['STAZ', 'Staż'],
]);

const modeMap = new Map([
    ['ZDALNIE', 'Zdalnie'],
    ['STACJONARNIE', 'Stacjonarnie'],
    ['HYBRYDOWO', 'Hybrydowo']
]);

function mapEnumToQuery(field: 'level' | 'contractType' | 'mode', queryEnum: keyof typeof Level | keyof typeof ContractType | keyof typeof WorkMode): string | undefined {
    switch (field) {
        case 'level':
            return levelMap.get(queryEnum as keyof typeof Level);
        case 'contractType':
            return contractTypeMap.get(queryEnum as keyof typeof ContractType);
        case 'mode':
            return modeMap.get(queryEnum as keyof typeof WorkMode);
        default:
            return undefined;
    }
}

export default mapEnumToQuery;