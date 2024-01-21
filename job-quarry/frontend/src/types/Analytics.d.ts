type Analytics = {
    totalViews: number,
    CTR: {
        percentage?: number,
        thumbnailViewsMinusViews: number,
        views: number
    },
    applications: number,
    applicationsToViews?: number,
    applicantsCategories: {
        notSpecified: number,
        first: number,
        second: number,
        third: number,
        fourth: number,
        fifth: number,
        sixth: number
    }
}