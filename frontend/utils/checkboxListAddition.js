export const entitlementBkAddition = [
  {
    id: 'day2',
    label: 'Day 2 Access',
    value: 'day2',
    checked: false,
  },
  {
    id: 'event_access',
    label: 'Event Access',
    value: 'event_access',
    checked: false,
  },
  {
    id: 'whopper_challenge',
    label: 'Whopper Challenge',
    value: 'whopper_challenge',
    checked: false,
  },
  {
    id: 'pvc_pouch',
    label: 'PVC Pouch',
    value: 'pvc_pouch',
    checked: false,
  },
  {
    id: 'tote_bag',
    label: 'Tote Bag',
    value: 'tote_bag',
    checked: false,
  },
]

export const entitlementBnefAddition = (areaAccess) => {
  const listCheckbox = []
  areaAccess.forEach((area) => {
    listCheckbox.push({
      id: area.type,
      label: area.name,
      value: area.type,
      checked: false,
    })
  })
  return listCheckbox
}
