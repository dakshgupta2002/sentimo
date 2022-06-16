import React from 'react'
import {Sidebar} from './../../components';
import {Cards} from './../../elements'

import './Favorite.css';

export default function Favorite() {
  return (
    <div>
        <Sidebar />

        <div className='favorite-container'>
            <Cards date={"23 Sep, 2022"} time={"22:00:03"} title="Ishwar" 
            content={`The oldest classical British and Latin writing had little or no space between words and could be written in boustrophedon (alternating directions). Over time, text direction (left to right) became standardized, and word dividers and terminal punctuation became common. The first way to divide sentences into groups was the original paragraphs, similar to an underscore at the beginning of the new group.[2] The Greek parágraphos evolved into the pilcrow (¶), which in English manuscripts in the Middle Ages can be seen inserted inline between sentences. The hedera leaf (e.g. ☙) has also been used in the same way..`} />
        </div>
    </div>
  )
}
