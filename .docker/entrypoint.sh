#!/bin/bash

yarn install --silent

cp .env.example .env

yarn prisma migrate dev

yarn start:dev