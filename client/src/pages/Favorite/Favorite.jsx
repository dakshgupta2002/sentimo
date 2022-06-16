import React from 'react'
import {Sidebar} from './../../components';
import {Cards} from './../../elements'

export default function Favorite() {
  return (
    <div>
        <Sidebar />
        <Cards date={"23 Sep, 2022"} time={"22:00:03"} title="Ishwar" content="Ishwarendra" />
    </div>
  )
}
