const levelMap = new Map([
    ['Junior', 'JUNIOR'],
    ['Mid', 'MID'],
    ['Senior', 'SENIOR']
]);

const contractTypeMap = new Map([
    ['Tymczasowa', 'TYMCZASOWA'],
    ['Umowa o Pracę', 'UMOWA_O_PRACE'],
    ['Umowa o dzieło', 'UMOWA_O_DZIELO'],
    ['Umowa zlecenie', 'UMOWA_ZLECENIE'],
    ['Praktyki zawodowe', 'PRAKTYKI_ZAWODOWE'],
    ['B2B', 'B2B'],
    ['Staż', 'STAZ'],
]);

const modeMap = new Map([
    ['Zdalnie', 'ZDALNIE'],
    ['Stacjonarnie', 'STACJONARNIE'],
    ['Hybrydowo', 'HYBRYDOWO']
]);

function mapStringToEnumValue(field: 'level' | 'mode' | 'contractType', string: string) {
    switch (field) {
        case 'level':
            return levelMap.get(string);
            break;
        case 'contractType':
            return contractTypeMap.get(string);
            break;
        case 'mode':
            return modeMap.get(string);
            break;
    }
}

export default mapStringToEnumValue;