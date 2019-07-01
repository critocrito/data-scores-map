// @flow
import * as React from "react";

const DocumentsIndexHelp = () => (
  <article className="pal bg-white">
    <p className="f4 lh-solid primary-color ttu bw3">Advanced search syntax</p>
    <p className="b">+ or a space</p>
    <p>
      Both terms have to appear in a document.
      <br />
      e.g. ‘kent police’ or ‘kent+police’ yields documents that contain both
      terms.
    </p>
    <p className="b">|</p>
    <p>
      One of the terms must appear in a document.
      <br /> e.g. ‘Suffolk|Norfolk’ yields documents that contain either
      ‘Suffolk’ or ‘Norfolk’. Multiple terms can be chained, e.g.
      ‘Suffolk|Norfolk|Essex’.
    </p>
    <p className="b">-</p>
    <p>
      The term following should not appear in the document.
      <br /> e.g. ‘dataset -food’ yields documents that contain the word dataset
      but not the word food.
    </p>
    <p className="b">&#8220;[phrase]&#8221;</p>
    <p>
      The exact phrase enclosed in double quotes has to appear in the document.
      <br /> e.g. ‘&#8220;integrated dataset&#8221;’ yields documents containing
      that exact phrase.
    </p>
    <p className="b">*</p>
    <p>
      Signifies a prefix query.
      <br /> e.g. ‘fo*’ matches any word that starts with ‘fo’ like ‘food’,
      ‘fortnite’, ‘form’, etc.
    </p>
    <p className="b">(...)</p>
    <p>
      Signifies a precedence and allows to construct grouped and/or nested
      queries.
      <br /> e.g. ‘ny|(york -new)’ yields documents that contain either ‘ny’ or
      the terms ‘york’ but not the term ‘new’.
    </p>
    <p className="b">~n</p>
    <p>
      This defines the degree of fuzziness to the search.
      <br /> e.g. ‘ken~1’ yields documents that not only contain the term ken,
      but also ten, pen, etc. After an exact phrase match it determines the slop
      amount (how far terms can be apart in the phrase), e.g. ‘&#8220;integrated
      datasets&#8221;~2’ will also yield documents with the phrase
      &#8220;integrated into these datasets&#8221;.
    </p>
    <p className="f4 lh-solid primary-color ttu bw3">More examples</p>
    <p className="b">&#8220;integrated dataset&#8221; -(food|kent)</p>
    <p>
      All documents containing the phrase &#8220;integrated dataset&#8221; but
      not ‘food’ or ‘kent’.
    </p>
    <p className="b">-agriculture -fishing</p>
    <p>
      All documents that do not contain the words ‘agriculture’ or ‘fishing’.
    </p>
    <p className="b">
      &#8220;integrated datasets&#8221;~2 experian (county|city) council -essex
      -IBM -Microsoft
    </p>
    <p>
      All documents that contain the phrase &#8220;integrated dataset&#8221;
      (the constituent words of which can be two words apart) and the words
      ‘experian’, ‘council’, and either county or city, but not ‘Essex’, ‘IBM’
      or ‘Microsoft’.
    </p>
  </article>
);

export default DocumentsIndexHelp;
