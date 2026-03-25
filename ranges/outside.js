'use strict'

const SemVer = require('semver/classes/semver')
const Comparator = require('semver/classes/comparator')
const { ANY } = Comparator
const Range = require('semver/classes/range')
const satisfies = require('semver/functions/satisfies')
const gt = require('semver/functions/gt')
const lt = require('semver/functions/lt')
const lte = require('semver/functions/lte')
const gte = require('semver/functions/gte')

const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options)
  range = new Range(range, options)

  let gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<