**Kent County Council Integrated Dataset**

For the Kent Integrated Dataset (KID), multiple datasets are stitched
together - GP practise, community health, mental health, out-of-hours,
acute hospital, public health, adult social care, hospice, district
council (data used may have expanded since). This is linked with a
person's NHS number. It is pseudonymised, but it was unclear if they
considered the NHS number pseudonymous, or if there's another layer. The
KID includes "both users and non-users of healthcare".

For the creation of risk scores, the KID uses Kings Fund combined
predictive model and the electronic frailty index. **\[There's other
stuff being used, info of which is below. Will write a better summary in
the future.\]**

Software used (possibly non-exhaustive):

Population segmentation: Experian's Mosaic, CACI's Acorn.

Data access: Microsoft SWL server Management Studio version 17

Statistical packages: SPSS, STATA, Excel

Data warehousing provided by Maidstone and Tunbridge Wells NHS Trust.

Monthly updates to the data. 1-2 months reporting lag, between things
happening and when it appears in their database. It is claimed this is
ok for analytics. 1-2% "non-linkage" rate, e.g. people who they can't
attribute to a record. In 2016 Gerrard Abi-Aad said they weren't yet
able to link people within households, but said they were working on
that. This would make sense with Mosaic and Acorn being used.

"Linked data analysis" is the broader term Gerrard Abi-Aad uses for this
overall process.

Data analytics is performed upon this linked data. Examples:

-   For each GP practise in Kent, they produced a risk score for the
    > probability of whether each individual would be "unnecessarily
    > admitted \[to hospital\]" within one year of the production of the
    > risk score. Based on factors such as their "extent of
    > poly-pharmacy", their age, their hospital re-admission history
    > over the previous three years, sex, and other factors. This data
    > is used to identify GP practises that may be admitting too many or
    > not enough patients and then used to open a "dialogue" with the
    > practises and other relevant actors.

-   Using data of the costs relating to every individual in the east of
    > Kent they mapped the distributions of costs. They can then use
    > this data to understand GP practises which are costing more. They
    > claim to account for various conflating factors to isolate where
    > the source of higher costs may be factors such as poor
    > administration bouncing them around between services.
    > Interestingly, in Abi-Aad's lecture, he says how they accounted
    > for the "confounding factor of deprivation" and used some
    > statistical magic to exclude it as a contribution to the figures.
    > I'm no stat-person so I'd hesitate to make a call about that, but
    > that strikes me as sketchy.

![](images/image2.png){width="7.125in" height="5.5740583989501316in"}

Source:
[[https://local.gov.uk/sites/default/files/documents/health-social-care-and-pu-fc6.pdf]{.underline}](https://local.gov.uk/sites/default/files/documents/health-social-care-and-pu-fc6.pdf)

A short lecture on the KID given by Gerrard Abi-Aad, confirmed for the
workshop:

Slides:
[[https://local.gov.uk/sites/default/files/documents/health-social-care-and-pu-fc6.pdf]{.underline}](https://local.gov.uk/sites/default/files/documents/health-social-care-and-pu-fc6.pdf)

Video:
[[https://www.youtube.com/watch?v=zgNowZ\_UJAg&t=40s]{.underline}](https://www.youtube.com/watch?v=zgNowZ_UJAg&t=40s)

**More materials to check out:**

A Google search where I was trying to identify the KID related materials
on the PHO website, because navigating through their interface is
painful:
[[https://www.google.com/search?source=hp&ei=zpvhWpSsBsSNkgX4p7eoCA&q=site%3Ahttp%3A%2F%2Fwww.kpho.org.uk+kid&oq=site%3Ahttp%3A%2F%2Fwww.kpho.org.uk+kid&gs\_l=psy-ab.3\...874.4526.0.4610.13.11.1.0.0.0.134.936.8j3.11.0\....0\...1.1j2.64.psy-ab..1.7.646.0..0j0i131k1j0i131i46k1j46i131k1j0i10k1.0.sREH00Vaaq8]{.underline}](https://www.google.com/search?source=hp&ei=zpvhWpSsBsSNkgX4p7eoCA&q=site%3Ahttp%3A%2F%2Fwww.kpho.org.uk+kid&oq=site%3Ahttp%3A%2F%2Fwww.kpho.org.uk+kid&gs_l=psy-ab.3...874.4526.0.4610.13.11.1.0.0.0.134.936.8j3.11.0....0...1.1j2.64.psy-ab..1.7.646.0..0j0i131k1j0i131i46k1j46i131k1j0i10k1.0.sREH00Vaaq8)

A PDF of a lecture summarising, from Aug 2017, also has some more
contacts, including some folks who don't look as senior:
[[http://www.kpho.org.uk/\_\_data/assets/pdf\_file/0004/74146/Kent-Integrated-Dataset-August-2017.pdf]{.underline}](http://www.kpho.org.uk/__data/assets/pdf_file/0004/74146/Kent-Integrated-Dataset-August-2017.pdf)

**Further, messier notes**

They've been allowing researchers to access the dataset. Actively
putting out a call for proposals. -
[[http://www.blgdataresearch.org/apply-now-to-access-the-kent-integrated-dataset/]{.underline}](http://www.blgdataresearch.org/apply-now-to-access-the-kent-integrated-dataset/)

**Notes on presentation given by Gerrard Abi-Aad, confirmed attendee to
workshop, works on KID**

[[https://www.youtube.com/watch?v=zgNowZ\_UJAg&t=40s]{.underline}](https://www.youtube.com/watch?v=zgNowZ_UJAg&t=40s)

Seems that the Kent Integrated Dataset is health and social care
focused. Not seeing mention of children's services stuff explicitly
here.

Person-level data, pseudoanonymised data using NHS number.

\-- How private is an NHS number, I'm wondering?

\-- Around 2:10 he seems to suggest the NHS number itself is
pseudoanonymised? Or does he mean its used as a label instead of
someone's name, and that makes it pseudoanonymous? Unclear. Maybe he's
just a nervous speaker.

They're trying to get health data from everywhere, still some areas (as
of Aug 2016) left to grab.

4-6 week lag with the data being updated, which he claims is acceptable
for predictive analytics.

1-2% of people they can't link up to an NHS number, so they can't be
pseudoanonyimised, so they get excluded from the linkage process; aren't
in the KID. That's with health data. Social care data is different.

He says (Aug 2016) they can't identify people at the house level, but
says its something they're interested in doing. Acorn and Mosaic are big
on house level stuff, so makes sense why they use them if that's a
direction they're interested in. ... "in the not too distant future".
Maybe implemented now.

He shows a good diagram re: the "data flows" that go into KID. Looks
like a good reference. (I'm gonna stop taking notes now, just gonna use
the rest of the lecture to absorb then get details when I'm reading
stuff later).

One last thought: He mentions demographic information/coding. I think
that is the story here: for all this health data and the analytics they
do, they're using demographic analysis developed by Experian and CACI,
companies who produced those demographics (originally, at least) for
marketing purposes. It's not a damning revelation, but there's cause to
be uncomfortable there.

Around 16:00, and in the case study just before that, he mentions how
they jigged the numbers so that deprivation of an area wouldn't show up
in the numbers, to try and give a more focused view of the data, he
basically says. That seems very political to me. You're choosing to
exclude that factor from your analysis. He's not completely dismissing
it, of course, but further down the chain when these numbers get used,
could it have been useful to see deprivation having an impact? This gets
to the heart of so much of this big data analysis: they try to isolate
factors and tease out a certain story, but you don't know what you might
have lost from the things you didn't think were relevant, or what might
be skewed from what you decided to weight.

**Notes on documents / pages provided by the FOI replies:**

**Acorn by CACI** notes:
[[https://docs.google.com/document/d/1T-c6tsAmiw\_DVpsrugKJo6QNPdq16UXO0Olf8XDtdlI/edit?usp=sharing]{.underline}](https://docs.google.com/document/d/1T-c6tsAmiw_DVpsrugKJo6QNPdq16UXO0Olf8XDtdlI/edit?usp=sharing)

**King's Fund combined predictive model** notes:

[[https://docs.google.com/document/d/1immE6zBC\_H5BdYYhMc2keW96Pv\_ggl0k12SNbe0Y5zs/edit?usp=sharing]{.underline}](https://docs.google.com/document/d/1immE6zBC_H5BdYYhMc2keW96Pv_ggl0k12SNbe0Y5zs/edit?usp=sharing)

Note: **Matthew Honeyman**, a researcher for the Kings Fund, is
confirmed for the April workshop.

**Electronic Frailty Index** notes:

[[https://docs.google.com/document/d/1zH91jYDv-kT2W1HByBSJ6jjWznhNUQyDx2gpdWtE8wM/edit?usp=sharing]{.underline}](https://docs.google.com/document/d/1zH91jYDv-kT2W1HByBSJ6jjWznhNUQyDx2gpdWtE8wM/edit?usp=sharing)

Notes on "Kent HWBB vision paper for integrated intelligence and
opportunities to link wider public sector (Nov 2013)":
[[https://docs.google.com/document/d/1pHaf4YpVtOmomBHDR6kuX7-smUEBh6x8IYEkXIIQUXg/edit?usp=sharing]{.underline}](https://docs.google.com/document/d/1pHaf4YpVtOmomBHDR6kuX7-smUEBh6x8IYEkXIIQUXg/edit?usp=sharing)

////\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*////

**FOI responses notes:**

**[\[Notes on PDF response\]]{.underline}**

Software mentioned:

Microsoft SWL server Management Studio version 17, to access data which
is then extracted into three statistical software programs for analysis:

-   SPSS

-   STATA

-   Excel

"Population segmentation data items" from

-   CACI ACORN (link provided:
    > [[https://acorn.caci.co.uk/]{.underline}](https://acorn.caci.co.uk/)
    > )

-   Experian Mosaic (link provided:
    > [[https://www.experian.co.uk/marketing-services/products/mosaic-uk.html]{.underline}](https://www.experian.co.uk/marketing-services/products/mosaic-uk.html)
    > )

RE: data warehousing, **Maidstone and Tunbridge Well\[s\] NHS Trust**
are the data processors, and the reply says we would need to contact
them for more info.

No training materials.

6 analysts from NHS England have been allowed access to the Kent
Integrated Dataset, process is governed by contracts between those
individuals and Kent County Council. The reply does not note the nature
of these contracts, what they cover, or who these analysts are and what
they are doing / did.

Access also granted to the **private consultancy, Carnall Farrar**,
"which was engaged by the Kent and Medway STP. The outputs of their work
are available from the K&M STP."

"**Whole Systems Partnership** have also accessed the KID to support
work commissioned by KCC to **produce models to improve our JSNA**."

**Contracts** relating to "extracting GP data and linking to the KID to"
CACI ACORN and Experian Mosaic are **held by Maidstone and Tunbridge
Wells NHS Trust**.

No costs vs savings reports or summaries.

To generate risk scores, "**Kings Fund combined predictive model** and
the **electronic frailty index**" are used.

-   Kings Fund combined predictive model:
    > [[https://www.kingsfund.org.uk/sites/default/files/field/field\_document/PARR-combined-predictive-model-final-report-dec06.pdf]{.underline}](https://www.kingsfund.org.uk/sites/default/files/field/field_document/PARR-combined-predictive-model-final-report-dec06.pdf)

-   Electronic frailty index:
    > [[https://academic.oup.com/ageing/article/45/3/353/1739750]{.underline}](https://academic.oup.com/ageing/article/45/3/353/1739750)

**[Things to chase up:]{.underline}**

-   Research SPSS and STATA - used anywhere else?

-   Research CACI ACORN - used anywhere else?

-   Could probe Maidstone and Tunbridge Wells NHS Trust for

-   \-\-\-- Information on their data warehousing related to the Kent
    > Integrated Dataset

-   \-\-\-- and, the contracts they hold relating to the KID with CACI
    > ACORN and Experian

-   Probe more what Carnall Farrar were doing.

-   Probe more re: Whole Systems Partnership and the models they
    > produced

-   Look into (particularly, find analyses of) the Kings Fund combined
    > predictive model, and the electronic frailty index.

**[Things to read:]{.underline}**

-   In the workshop, Abi-Aad said that they've published summaried
    > results of what they've done on the Public Health Observatory
    > website (something he's heavy involved with too, I think)

-   Also check out what else is on PHO

**[\[Notes on response that was in email form - copied to document in
Responses Kent folder\]]{.underline}**

Documents they link to re: us asking for briefings, reports,
evaluations, etc. They claim they're just a few examples, because to
find all such examples would require giving us an amount of data that
would take more than the 18 hours to compile:

-   Link to Kent HWBB vision paper for integrated intelligence and
    > opportunities to link wider public sector (Nov 2013)
    > [[https://democracy.kent.gov.uk/documents/s43602/Item%207%20b%20HWBB%20integrated%20intelligence.pdf]{.underline}](https://democracy.kent.gov.uk/documents/s43602/Item%207%20b%20HWBB%20integrated%20intelligence.pdf)

-   Link to Kent HWBB paper on vision for a JSNA 'plus' (March 2016)
    > [https://democracy.kent.gov.uk/documents/s63846/Item%206%20-%20JSNA.pdf]{.underline}

-   Link to Kent HWBB for redesign of Joint Health & Wellbeing Strategy
    > (march 2017)
    > [https://democracy.kent.gov.uk/documents/s76463/App%20A.pdf]{.underline}

<!-- -->

-   Cohort modelling presentation by Peter Lacey (case example of
    > testing varying investment of smoking cessation vs smoking
    > prevention-- impact on increase/ decrease of ex-smokers and never
    > smokers) (March 2017)
    > [https://democracy.kent.gov.uk/documents/s76464/App%20B%20Kent%20pop%20modelling%20project%20HWB%20v2.pdf]{.underline}

-   Kent County Council Health reform and Public Health Cabinet
    > Committee
    > [[https://democracy.kent.gov.uk/ieListDocuments.aspx?CId=895&MId=7736&Ver=4]{.underline}](https://democracy.kent.gov.uk/ieListDocuments.aspx?CId=895&MId=7736&Ver=4)

-   NHS Digital Interim Audit Report
    > [[http://content.digital.nhs.uk/media/24796/Data-Sharing-Agreement-Audit\--Kent-County-Council/pdf/Data\_Sharing\_Agreement\_Audit\_Report\_-\_Kent\_County\_Council.pdf]{.underline}](http://content.digital.nhs.uk/media/24796/Data-Sharing-Agreement-Audit--Kent-County-Council/pdf/Data_Sharing_Agreement_Audit_Report_-_Kent_County_Council.pdf)

They say they've given lots of presentation, with most of them using
similar slides. They embedded a .ppx file in the reply, but I can't seem
to access it. Maybe an issue with with Joanna forwarded it to me?

They point us in the direction of the Kent Public Health Observatory for
**more detailed reports** on the "analytical outputs in summary". The
link they give is:
[[http://www.kpho.org.uk/]{.underline}](http://www.kpho.org.uk/)

They then list the **Kings Fund model** and **Electronic frailty Index**
mentioned in the other reply. Here are the links they point us to (I
think they're different links to the ones given in the other reply):

-   -   Risk of unplanned admittance to hospital -- [[uses the King's
    > Fund model described
    > here]{.underline}](https://www.kingsfund.org.uk/projects/predicting-and-reducing-re-admission-hospital).

-   Electronic Frailty Index -- [[described
    > here.]{.underline}](http://clahrc-yh.nihr.ac.uk/our-themes/primary-care-based-management-of-frailty-in-older-people/projects/development-of-an-electronic-frailty-index-efi)

Under a heading "Socio-economic profiling tools (not risk assessment as
such) they link to **CACI ACORN** and **Experian Mosaic**, using the
same general, marketting links as the other reply. But they also list:

-   · Index of Multiple Deprivation (reported at LSOA level);
    > [[https://www.gov.uk/government/statistics/english-indices-of-deprivation-2015]{.underline}](https://www.gov.uk/government/statistics/english-indices-of-deprivation-2015)

They say they have no briefing notes on the **Kings Fund model**
because, they claim, it's **very well established in the NHS**.

Super interesting though: they say they have **not briefed commissioners
on Acorn or Mosaic as "they are generally well understood".** Just how
widely are these tools used? They continue:

> There is normally a **description of the categories** used from each
> tool in specific pieces of analyses. **The descriptions are lifted
> directly from the documentation from the two companies**.

Sounds like they're parroting CACI and Experian's demographic
descriptions. Well, that's what they pay for I guess, so not too
surprising, but seeing it spelled out like that feels sketchy. Surely
these demographic definitions have a significant impact, even if it's
not the most transparent impact ever.

They claim to not have deployed any **predictive analytic processes** (I
wonder where our definitions would differ, however), but they do say
**that is is an ambition**. They continue:

> Many of the analyses completed do project into the future based on
> past trends (see the presentation below for examples).

As I said, maybe our definitions differ, because that sounds like
predictive analytics to me.

They next say:

> There is a system dynamics model under development and it is available
> to [[view
> here]{.underline}](http://www.thewholesystem.co.uk/systems-thinking-modelling/hosted-online-models/kent-cc-cohort-test/).
> **It is intended to see the impact of the health prevention agenda
> (reducing smoking, obesity, etc) on the health system** but is still
> **at an early stage of development**.

The link:
[[http://www.thewholesystem.co.uk/systems-thinking-modelling/hosted-online-models/kent-cc-cohort-test/]{.underline}](http://www.thewholesystem.co.uk/systems-thinking-modelling/hosted-online-models/kent-cc-cohort-test/)

**NOTE: This looks to be the Whole Systems Partnership model mentioned
in the other response.**

Re: how risk scores are produced:

> **We do not hold any specific information about how the risk scores
> are produced other than the national guidance linked to above.**

Maybe I'm tired because I'm writing this at the end of the day, but I'm
confused where these risk scores are even coming from? This question
could be probed further by **reading more of their presentation, etc.,
materials on how the whole system functions.**

Re: request for promo materials:

> We do not hold any promotional material although there are a small
> number of case studies.
>
> [http://www.ukauthority.com/news/7707/the-uprn-in-kents-public-health-drive]{.underline}
>
> [https://www.involve.org.uk/wp-content/uploads/2017/07/workshop-examples.pdf]{.underline}
>
> [https://www.local.gov.uk/sites/default/files/documents/kent-county-council-kent\--690.pdf]{.underline}
>
> [https://solutions.hsj.co.uk/kent-integrated-dataset-improves-partnership-working/7014997.article]{.underline}

They say they hold no educational materials. *How do staff learn about
this all then?*

The following seems pretty key to the sorts of things we're interested
in:

> It should be noted that the KID is a population health planning tool
> and **no decisions affecting individuals' health or social care
> provision are taken using the data held in the KID**. The **KID
> informs decisions about which services to commission** by providing
> evidence for evaluations and modelling care pathways.

**TODO**: Dwell more on what that means beyond the NHS jargon when it's
not nearly 7pm on a Tuesday.

**Important point re: names/definitions we were confused about:** There
they mention the KID as a "population health planning tool". That could
be the more adult aimed stuff we heard about. Straight after that, they
speak about "Strategic Business Development and Intelligence" creating
an "integrated dataset" related to children from ages 5 - 16 (inclusive)
based on data from "the academic year September 2016 to August 2017".
***So, these two things are different and separate, then?*** A dataset
etc. for population health stuff, then one for children? Here's the
section quoted entirely:

> Strategic Business Development and Intelligence have created an
> integrated dataset of all children and young people in Kent, from the
> ages of five to 16 (inclusive) as at the 31^st^ August 2017. The model
> is based on the academic year September 2016 to August 2017. The
> integrated dataset includes a total of 30 datasets, which are provided
> by the following divisions:

-   Management Information Unit - Education Young People's Service

-   -   Management Information - Specialist Children's Services

-   -   Environment, Planning & Enforcement - Growth Environment and
    > Transport

-   -   Libraries, Registration and Archives - Growth Environment and
    > Transport

> This dataset is **used as an internal analytical tool to understand
> service demand at the individual level**, and to **support service
> design generally** but this **is not currently used for risk scoring
> or predictive analytics**. It is a cross-sectional database and not
> longitudinal so is better described as descriptive analysis for the
> purposes of understanding service demand and service planning.
>
> SDBI provide reports and analysis that draws on the integrated dataset
> to support services as required. The reports use standard
> presentational methods such as graphs, maps and charts to illustrate
> and draw out any trends.

They then provide a diagram showing an example of statistics related to
pupils who did not reach the expected Key Stage 2 level (e.g. "16.1%
borrowed a library book ... 19.9& have other SEN").

They then claim there are no educational materials produced because the
model is only used internally. Re: this and the earlier claim about no
educational material: **I don't think they understood we meant
educational material *for staff*, but, rather, thought we meant
something for the public.**

**[Things to chase up from this request response:]{.underline}**

-   **Read all** the links.

-   Think more on the separation between the population health level
    > stuff and the children's services stuff. Do we need to ask
    > separately if Acorn and Mosaic, and the other things mentioned,
    > are used for the children's services stuff? Or am I just tired
    > whilst reading this and they basically said that they only use the
    > children's services dataset to come up with the sorts of %
    > statistics they show with the diagram. (From my understanding of
    > Mosaic, it would make zero sense to use in the context of just
    > children. You'd have to re-make it, almost from scratch, to tailor
    > it just for kids.)

-   Read into the two models mentioned that were also mentioned in the
    > other request response, and also **chase up the third one they
    > mentioned here**.

-   **Worlds System Partnership** stuff still worth a look. This gives a
    > more solid place to look than the other request.

-   Chase up that **embedded presentation document** that I couldn't
    > access from the version of this forwarded to me by Joanna.

-   Think on how they **misunderstood our definition of "educational
    > materials"** and use this to tweak later FOIs.

-   Generally try and map out how all this fits together. Again: just
    > need to read a tonne of the stuff they sent.

**[The things that stand out in light of both requests]{.underline}**:

-   CACI Acorn is a name to check out.

-   Worlds System Partnership

-   Still need to read more to work out how separate these population
    > health and children's services sides are.

-   Still need to read more to understand more in detail how it's all
    > deployed, used, etc.

-   They seem to have a different definition of "predictive analytics"
    > than us (ours being looser, and more general).

-   Misunderstanding over "educational materials"

-   Need to read, read, read, all of their docs (lots from the second
    > request here).

Closing thought: CACI is an awful name for a company.

***[\_\_\_\_OLDER NOTES\_\_\_\_]{.underline}***

See also: **Mosaic**, by **Experian**, \[\[pasted below\]\]

Malomo et al 2017 ('Data Intelligence for Local Government? Assessing
the Benefits and Barriers to Use of Big Data in the Public Sector'.
Joanna emailed it to me, and I have it downloaded in the DJL folder) use
this as a case study towards the end of their article. Reading there is
better than me regurgitating here.

Basically, they're trying to combine a bunch of their different datasets
across different services to be able to predict where needs are
emerging, focusing on children's services at this time. Still an ongoing
thing being developed, according to the article. The article also frames
it all as a response to (without using this word) austerity measures
since 2010.

Worth noting is that alongside the IDM they use Mosaic, by Experian.
Basically a piece of marketing software. Sketchy shit.

The system, according to Malomo et al 2017, has already influenced
policy:

"The score is only a descriptive indicator that ranks **individual
children** and is not a predictor of future risk. But the risk score has
allowed commissioners to identify clusters of children with multiple
needs and the socio-economic characteristics of their families while
making explicit the different pathways followed by children when
accessing the different services. In turn, this exercise has helped to
identify the services that are under pressure so that the pressure in
one area can be reduced by strengthening the provision in other areas.
For instance, the IDM and the associated risk score have helped to show
that most of the referrals to children's services could have been
avoided with a stronger provision of support for children's emotional
well-being. In particular, the IDM has helped to highlight the gap in
existing provision around emotional well-being services with the result
that corrective measures were put in place last year to address the gap.
16 Similarly the IDM has identified a gap in the provision of mental
health support services not only for the child but for their family as
well." (p.20)

More on how it's influenced policy, in this quote that it is implied is
from someone at the Business Intelligence team at Kent County Council:

"To date the model has been used to better understand young people and
the communities from which they emerge. It has been used to target the
delivery of services, commission preventative services, inform business
planning and workforce development . . . The development of detailed
locality based mapping that draws on the data has been particularly
helpful for commissioners looking to use resources differently and
develop service delivery solutions." (p.21)

The Limitations section of Malomo et al 2017 is interesting also.

This is also a case study in Nesta's Wise Councils report. Here's their
summary:

"Theme: Adult social care, health and public health

Kent has developed one of the largest integrated health and social care
datasets in the UK, covering a population of around 1.5 million people
in Kent. The objectives were to:

• Help Kent council and health services understand the impact of
changing the services provided in the county.

• Rigorously test whether services were achieving their stated
objectives.

• Identify where there are variations in performance levels in the
county.

The data set is comprised of pseudonymised data from acute, community,
mental and primary health services and adult social care. This data set
enables the public health team in Kent to conduct sophisticated data
analysis about what would happen if changes to services or policies were
made.

Having an integrated data set of this size also means Kent can test
'what works' in the county by running matched cohort analyses. These
compare the outcomes of people who receive a service or intervention
with a statistically similar group who didn't. This indicates whether
differences in outcomes are attributable to the programme.

Benefits

• Decision-makers get high quality information about the possible impact
of changes to health and social care services.

• Decisions to reduce or expand services can be made on the basis of
rigorous evidence of effectiveness.

• Analysis can highlight where remedial action is needed because
services are not performing as they should."

Minutes on a meeting by KCC discussing the Integrated Dataset (the
phrase they use -- Malamo might've been using different wording):
[https://democracy.kent.gov.uk/mgAi.aspx?ID=44791]{.underline}

**Mosaic**

**Experian (yes, the credit scoring agency)**

**\[gov\]\[uk\]\[socialservices\] \[score\] \[\*\]**

**\[gov\]\[uk\]\[fire\]**

Used by **Kent County Council** for children's services, alongside / as
part of their Integrated Data Model

Used by **London Fire Brigade** to identify areas containing at risk (of
fire) demographics.

Used by **Lancashire County Council** to help determine where to
distribute services (possibly adult social care, or possibly more. Not
sure at this stage).

Lancashire CC info:

\-
[https://app.powerbi.com/view?r=eyJrIjoiMDZlMTFlOWMtOGVlNi00OTE4LWIxNjQtZGMyY2Y3ODNmODVlIiwidCI6IjlmNjgzZTI2LWQ4YjktNDYwOS05ZWM0LWUxYTM2ZTRiYjRkMiIsImMiOjh9]{.underline}

\-
[https://community.powerbi.com/t5/Data-Stories-Gallery/Lancashire-County-Council-Neighbourhood-Intelligence/td-p/232538]{.underline}

Lancashire is very open about how they use it:
[http://www.lancashire.gov.uk/lancashire-insight/area-profiles/mosaic-analysis]{.underline}

In general, these really comprehensive dashboards are a good idea, but
the shit is buggy and missing Mosaic category descriptions and doesn't
display enough information for it to be usable. Maybe it's old and its
gotten buggy or lost info sources over the years. Though at the bottom
of the page where it's being diplayed it says last updated July 2017:
[[http://www.lancashire.gov.uk/lancashire-insight/area-profiles/mosaic-analysis]{.underline}](http://www.lancashire.gov.uk/lancashire-insight/area-profiles/mosaic-analysis)
I tried that link in Firefox and Brave and it's missing info for
category descriptions that make it pretty useless.

Tbf, they do have this Tips and Tricks on how to use the system,
document. Which I'm not gonna spend ages reading right now:
[http://www.lancashire.gov.uk/media/901913/tipsandhintspowerbidashboard.pdf]{.underline}

"Mosaic Public Sector" brochure. Not sure when from. Lancashire CC say
they use "Mosaic Public Sector 2016" (see links under "Lancashire CC
info:" above.

\-
[https://www.experian.co.uk/assets/marketing-services/brochures/mosaic-ps-brochure.pdf]{.underline}

2010(?) brochure on Mosaic and public sector stuff:

[https://sp.ukdataservice.ac.uk/doc/5738/mrdoc/pdf/5738\_mosaicpublicsector\_info\_2010.pdf]{.underline}

It mentions the different demographic categories they used, but I'm
pretty sure that that long video on Mosaic (somewhere in this section, I
think) mentioned that they'd honed their categories and added some more.

***London Fire Brigade***

[https://www.nesta.org.uk/blog/rise-and-rise-uk-city-data-analytics]{.underline}

"Andy Mobbs, Business Intelligence Manager at the London Fire Brigade
(LFB), made a powerful case that some people are dying in household
fires when smarter use of data could have enabled preventative and
potentially life-saving measures. He explained that simply mapping the
number of fires across London is of limited effectiveness. After all,
fires are started by people not places.

His focus has therefore been on looking at the social characteristics
leading to fires. By examining past cases of fires and connecting the
addresses to Mosaic data (which show demographic information), he has
been able to confirm that older people and those on lower incomes are at
higher risk - helping create a map of priority postcodes as shown below.
This group make up 19% of all London households but experience 31% of
all fires in the home and 33% of all fire-related casualties. Working
with front-line colleagues, LFB has built up a detailed profile of most
likely to die in a fire in their home:

"This is an older person aged over 65 who lives alone. Where they live,
or the type of property, doesn't matter. They will have reduced mobility
and find it hard to walk unaided. As such, they will spend most of their
time in one room of their home and often this can become a bed/sitting
room. This person is a smoker, uses candles or has other naked flames in
their home.

"This person also has other health issues. They may have an impaired
judgement or become forgetful or disorientated; either through a health
issue, or as a result of their medication or from drinking. There may be
signs of previous fire 'near misses'; this could be cigarette burn marks
on clothing or furnishing, or scorch marks from cooking or using
candles. This person either receives, or would benefit from, some care
support (from a relative, neighbour, or care provider)."

Andy's key point was this: somebody knows these people.

His aim is to use a wide range of data to identify individuals likely to
match the description. Key datasets would include the list of households
requiring assisted bin collections - the assumption being that if a
person has trouble putting the bins out they are also likely to
experience other mobility issues. Households registered for the council
tax single occupier discount would also help highlight people living
alone."

***Kent County Council***

Malomo et al 2017 (p.19) refer to it in one sentence, brushing over it:

Additional information about the social context is drawn from the
Experian social segmentation tool Mosaic, which allows better
understanding of the incidence of specific issues and problems within
specific communities.

Real interesting that it's made by Experian. I mean, it makes sense,
this sort of big data stuff is sort of the logical extension of using
credit scores to score people. And then, surprise surprise, the same
software is leaking its way into government. Malomo et al just drop it
in like it's nothing, not exploring that a piece of software used for
marketing is being deployed by Kent County Council to attempt to predict
local needs, and therefore inform budgetary decisions. Is this something
that's done so often that it's not worth noting? Or do they just see no
problem with it (and I sense are perhaps even excited by this all).

Here's a video of some guy going through what Mosaic can do. A long
video (I've watched 10 minutes-ish), but super informative:
[[https://www.youtube.com/watch?v=Db5HiSyzbi0]{.underline}](https://www.youtube.com/watch?v=Db5HiSyzbi0)
This video is particularly interesting for the few times where he notes
the sources of the data Mosaic uses. Worth noting down / chasing up
elsewhere, perhaps.

-- Bloody hell. So, around **12:25 in the video**, he goes down to the
level of showing the Google Street View integration with Mosaic. Of
course, nowadays its trivial if you know someone's address to go and
look that up, but I'm sure lots of folk would feel uncomfortable knowing
that their council is using this software alongside all the data the
council has, and its in the hands of random admin staff.

-- **14:30** in the video, he starts going on about how the user of
Mosaic can integrate their data into the system. Perhaps that's what
Kent County Council are doing. Maybe they're using Mosaic as a user
friendly front-end.

Mosaic is localised, so don't get mixed up with the US version. Here's a
brochure for the UK version (not sure from how long ago, got a direct
link with a DDG search "experian mosaic UK":
[https://www.experian.co.uk/assets/marketing-services/brochures/mosaic\_uk\_brochure.pdf]{.underline}

The page for the UK version:
[https://www.experian.co.uk/marketing-services/products/mosaic-uk.html]{.underline}

From 'Understanding What Mosaic Is":

Mosaic is Experian\'s powerful cross-channel consumer classification
designed to help you understand the demographics, lifestyles,
preferences and behaviours of the UK adult population in extraordinary
detail.

Mosaic has evolved to help you understand and communicate with consumers
in a way that matches their world. In the new cross-channel reality,
Mosaic enables you to accurately and consistently engage with consumers
wherever they are, offering endless possibilities.

This software, in KCC, is used in conjunction with their Integrated Data
Model, which is a case study at the end of Malono et al 2017, where they
claim it's the first scheme of its type that they know of at the time of
writing. Basically, the council is consolidating a bunch of its data
sets together, in this instance focusing on children/young people 0-25
(strongest data being 0-16) with the intent to predict areas where more
resources will be needed in advance to the need fully manifesting.
Classic big data, predictive analytics.

Full title of the article is 'Data Intelligence for Local Government?
Assessing the Benefits and Barriers to Use of Big Data in the Public
Sector'. Joanna emailed it to me, and I have it downloaded in the DJL
folder.

This will get its own section in the Government Departments document /
section, but consider the following from Malomo et al, referring to the
Integrated Data Model, which they use Mosaic as part of:

The main users of the IDM have been commissioners. How has the IDM been
used for commissioning? Operationally, the IDM has led to the
development of a "**risk score**" which is used to identify groups of
children who are more likely to use different services.

Consider the critique of dashboards in the Demos policy paper
"Governance by Dashboard" (Joanna sent it to you). Here's an excerpt
that gets to just one problem with government using this sort of
dashboard (produced for marketing purposes) for public affairs:

"Second, select the right framework of analysis and understand
limitations. There are several factors that may lead to poor, biased,
insufficient, or irrelevant data being used in dashboards. The
limitations of dashboards need to be acknowledged and, where possible,
amended. On a practical level, this data may simply not effectively
measure what it seeks to, instead being cut and scraped until it 'looks
right'. Users can be blinded by large numbers, or have insufficient
understanding of the strengths and weaknesses of the data they are
using. Dashboards have the potential to mislead as well as inform. One
particular danger is that the focus on design principles contributes to
the obscuring of certain types of bias. Dashboard bias needs to be
carefully considered before decision making."

Refer to that policy paper for more critique. Though, bear in mind it's
a pretty brief paper. A comprehensive critique by no means (well,
actually, I'm writing this when I'm only a few pages in, not actually to
the intro yet, but the brief principles it sets out at the start, so I'm
probs judging too soon and assuming everything is written this
matter-of-fact). Though perhaps you could imagine just extending the
critique of dashboards from a more general critique of the
non-universbility of information technologies, or something like that.
