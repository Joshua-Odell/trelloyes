import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Card from './Card'

it ('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it ('snapshot of card matches', () => {
    const tree = renderer
        .create(<div className='Card' />)
        .toJSON();
    expect(tree).toMatchSnapshot();    
});