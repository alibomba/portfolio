import Level from "./Level"
import ContractType from "./ContractType"
import WorkMode from "./WorkMode"

type OfferSearchInput = {
    searchInput: {
        phrase?: string,
        city?: string,
        level?: keyof typeof Level,
        contractType?: keyof typeof ContractType,
        mode?: keyof typeof WorkMode,
        technologies?: string[],
        salaryFrom?: number,
        salaryTo?: number,
        page: number
    }
}

export default OfferSearchInput