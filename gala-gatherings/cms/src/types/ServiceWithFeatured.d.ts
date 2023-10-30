interface ServiceWithFeatured extends Service {
    FeaturedOffer: {
        id: string,
        serviceId: string
    }
}