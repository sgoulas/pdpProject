import React from 'react';

const FAQ: React.FC = () => (
    <div>
        <h2>About this project</h2>
        <p>
            This is a project I created as part of my personal development plan
            at{' '}
            <a
                href="https://www.agileactors.com/"
                target="_blank"
                rel="noreferrer"
            >
                Agile Actors
            </a>
            . The aim was to use a technology stack that I was not familiar with
            in order to create a mobile first application.
        </p>
        <h3>Stack</h3>
        <p>
            I wanted to experiment with technologies and things that were new to
            me as well as ones that I was familiar with but had no experience
            implementing them in React.
        </p>
        <ul>
            <li>React 18</li>
            <li>Material-UI</li>
            <li>Redux, redux-saga, redux toolkit</li>
            <li>Webpack 5</li>
            <li>Babel</li>
            <li>Typescript</li>
            <li>Next 11</li>
            <li>Apollo</li>
            <li>GraphQL</li>
            <li>Jest and React Testing Library</li>
            <li>SEO, Open Graph Protocol and Structured Metadata</li>
        </ul>
        <h3>Points of interest</h3>
        <li>
            Project and toolchain set up from zero, no forks of premade
            projects, no create react app.
        </li>
        <li>Mobile first design</li>
        <li>
            Apollo server introspection script for generating server schema on
            the front end
        </li>
        <li>Github pipeline</li>
        <li>DUCKS folder structure</li>
        <li>Husky pre-commit hooks</li>
        <li>
            SEO, OpenGraph protocol implementation and structure data mark up
        </li>
        <li>
            Mark up validated by{' '}
            <a
                href="https://validator.w3.org/"
                target="_blank"
                rel="noreferrer"
            >
                W3C mark up validator
            </a>
            , accessibility validated by{' '}
            <a href="https://wave.webaim.org/" target="_blank" rel="noreferrer">
                WAVE
            </a>
            , structured data validated by{' '}
            <a
                href="https://validator.schema.org/"
                target="_blank"
                rel="noreferrer"
            >
                schema.org validator
            </a>
        </li>
        <li>ADR folder detailing architectural decisions</li>
        <li>
            Detailed development diary with daily entries for each development
            day, the problems I encountered, the driving factors behind my
            decisions and my thoughts during each step of the way
        </li>
        <h4>Special Thanks</h4>
        <p>
            To my coach,{' '}
            <a
                href="https://github.com/emazyka"
                target="_blank"
                rel="noreferrer"
            >
                Ema Zyka
            </a>
        </p>
    </div>
);

export default FAQ;
