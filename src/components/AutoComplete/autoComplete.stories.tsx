import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {AutoComplete, RenderItemType} from './autoComplete'
import { withInfo } from '@storybook/addon-info'

interface StateProps {
  value: string;
  order: number;
}

interface GitProps {
  login: string;
  url: string;
}

const defaultComplete = () => {
  const states = [
    {
      value: 'Alabama',
      order: 0,
    },
    {
      value: 'Alaska',
      order: 1,
    },
    {
      value: 'American Samoa',
      order: 2,
    },
    {
      value: 'Arizona',
      order: 3,
    },
    {
      value: 'Arkansas',
      order: 4,
    },
    {
      value: 'California',
      order: 5,
    },
    {
      value: 'Colorado',
      order: 6,
    },
    {
      value: 'Connecticut',
      order: 7,
    },
    {
      value: 'Delaware',
      order: 8,
    },
    {
      value: 'District of Columbia',
      order: 9,
    },
    {
      value: 'Federated States of Micronesia',
      order: 10,
    },
    {
      value: 'Florida',
      order: 11,
    },
    {
      value: 'Georgia',
      order: 12,
    },
    {
      value: 'Guam',
      order: 13,
    },
    {
      value: 'Hawaii',
      order: 14,
    },
    {
      value: 'Idaho',
      order: 15,
    },
    {
      value: 'Illinois',
      order: 16,
    },
    {
      value: 'Indiana',
      order: 17,
    },
    {
      value: 'Iowa',
      order: 18,
    },
    {
      value: 'Kansas',
      order: 19,
    },
    {
      value: 'Kentucky',
      order: 20,
    },
    {
      value: 'Louisiana',
      order: 21,
    },
    {
      value: 'Maine',
      order: 22,
    },
    {
      value: 'Marshall Islands',
      order: 23,
    },
    {
      value: 'Maryland',
      order: 24,
    },
    {
      value: 'Massachusetts',
      order: 25,
    },
    {
      value: 'Michigan',
      order: 26,
    },
    {
      value: 'Minnesota',
      order: 27,
    },
    {
      value: 'Mississippi',
      order: 28,
    },
    {
      value: 'Missouri',
      order: 29,
    },
    {
      value: 'Montana',
      order: 30,
    },
    {
      value: 'Nebraska',
      order: 31,
    },
    {
      value: 'Nevada',
      order: 32,
    },
    {
      value: 'New Hampshire',
      order: 33,
    },
    {
      value: 'New Jersey',
      order: 34,
    },
    {
      value: 'New Mexico',
      order: 35,
    },
    {
      value: 'New York',
      order: 36,
    },
    {
      value: 'North Carolina',
      order: 37,
    },
    {
      value: 'North Dakota',
      order: 38,
    },
    {
      value: 'Northern Mariana Islands',
      order: 39,
    },
    {
      value: 'Ohio',
      order: 40,
    },
    {
      value: 'Oklahoma',
      order: 41,
    },
    {
      value: 'Oregon',
      order: 42,
    },
    {
      value: 'Palau',
      order: 43,
    },
    {
      value: 'Pennsylvania',
      order: 44,
    },
    {
      value: 'Puerto Rico',
      order: 45,
    },
    {
      value: 'Rhode Island',
      order: 46,
    },
    {
      value: 'South Carolina',
      order: 47,
    },
    {
      value: 'South Dakota',
      order: 48,
    },
    {
      value: 'Tennessee',
      order: 49,
    },
    {
      value: 'Texas',
      order: 50,
    },
    {
      value: 'Utah',
      order: 51,
    },
    {
      value: 'Vermont',
      order: 52,
    },
    {
      value: 'Virgin Island',
      order: 53,
    },
    {
      value: 'Virginia',
      order: 54,
    },
    {
      value: 'Washington',
      order: 55,
    },
    {
      value: 'West Virginia',
      order: 56,
    },
    {
      value: 'Wisconsin',
      order: 57,
    },
    {
      value: 'Wyoming',
      order: 58,
    },
  ]
  // const getSuggestions = (inputVal: string) => {
  //   return states.filter((state) => state.value.includes(inputVal))
  // }
  const getSuggestions = (inputVal: string) => {
    return fetch(`https://api.github.com/search/users?q=${inputVal}`)
      .then(res => res.json())
      .then(data => {
        const {items} = data
        return items.slice(0, 10).map((item: GitProps) => ({value: item.login, ...item}))
      })
  }

  const stateRender = (item: RenderItemType<StateProps>) => {
    return <h5>state: {item.value} order: {item.order}</h5>
  }

  const gitRender = (item: RenderItemType<GitProps>) => {
    return (
      <>
      <h5>login: {item.login}</h5>
        <p>url: {item.url}</p>
      </>
    )
  }

  return (
    <AutoComplete
      getSuggestions={getSuggestions}
      onSelect={action('tested')}
      renderOption={gitRender}
    />
  )
}

storiesOf('AutoComplete component', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('AutoComplete', defaultComplete)
