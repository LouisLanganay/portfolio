export const CAL_API_CONFIG = {
  // Configuration de base
  username: 'louislanganay',
  eventTypeSlug: '30min',
  timezone: 'Europe/Paris',

  baseUrl: 'https://api.cal.com',
  slotsEndpoint: '/v2/slots',

  defaultDaysAhead: 7,
}

export const getCalUrl = (): string => {
  return `https://cal.com/${CAL_API_CONFIG.username}/${CAL_API_CONFIG.eventTypeSlug}`
}
