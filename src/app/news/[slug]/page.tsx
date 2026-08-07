import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ─── Article data ─────────────────────────────────────────────────────────────

const articles: Record<string, {
  slug: string;
  date: string;
  category: string;
  title: string;
  readTime: string;
  content: React.ReactNode;
}> = {

  // ── Post-Release Development Update ───────────────────────────────────────
  'august-dev-update': {
    slug: 'august-dev-update',
    date: 'August 6, 2026',
    category: 'Development Update',
    title: 'Synaptic A220 - August Development Update',
    readTime: '8 min read',
    content: (
      <>
        <p>
          Hey everyone, we&apos;re excited to be back with a quick development snapshot of the A220. A little over one week from release, the response to the Synaptic A220 has meant a huge amount to us. As our first product, seeing so many people flying and enjoying the aircraft, while also pushing it hard enough to uncover issues has been both exciting and humbling. We&apos;ve been working nonstop since launch to improve stability, reliability, and the overall day-to-day experience of flying the A220. At the same time, we also need to address an important issue around systems and avionics crash telemetry, and data collection that was recently brought to our attention.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/news/update-2026-08-06-p1-1.png"
          alt="Synaptic A220 - August Development Update visual"
          className="w-full rounded-xl border border-white/10 my-8"
        />

        <h2>Progress in Review</h2>
        <p>
          Since the release of the Synaptic A220, our focus has remained firmly on improving stability, performance, and the overall day-to-day experience. Within the first week, we&apos;ve released several patches up to v1.0.3 to address a wide range of reported issues while introducing several quality-of-life improvements across the aircraft. We&apos;re currently committed to a <strong>weekly</strong> update cycle to keep improving performance for all users across all supported platforms.
        </p>

        <h2>Stability &amp; Crash Fixes</h2>
        <p>We have addressed several WASM-related stability issues, including:</p>
        <ul>
          <li>Crashes when clearing flight-plan discontinuities</li>
          <li>Instability during APU starts while operating on battery power</li>
          <li>Occasional crashes when using the simulator&apos;s native navigation data</li>
          <li>Localized WASM crashes during normal flight</li>
        </ul>

        <h2>Navigation &amp; FMS Improvements</h2>
        <ul>
          <li>Updated the included Navigraph database to cycle 2503</li>
          <li>Added navigation database selection through the FMS DBASE STATUS page</li>
          <li>Refined flight-plan discontinuity and route-handling logic</li>
          <li>Corrected Direct-To FAF behaviour and magnetic variation on displayed courses</li>
          <li>Improved validation of zero-fuel weight, altitude and SimBrief username entries</li>
        </ul>

        <h2>Avionics &amp; Aircraft Systems</h2>
        <ul>
          <li>Resolved issues affecting terrain rendering on the ND</li>
          <li>Corrected abnormal engine indications related to ambient EGT</li>
          <li>Fine-tuned autobrake behaviour during de-rotation</li>
          <li>Corrected checklist logic and several cockpit indications</li>
          <li>Resolved flight-phase reset issues during aircraft turnarounds</li>
        </ul>

        <h2>Performance &amp; Art Optimization</h2>
        <p>
          An optimization pass has been conducted across the cockpit and cabin, a part of a greater model/art optimization plan which will span the next few weeks:
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/news/update-2026-08-06-p3-1.png"
          alt="Performance and art optimization visual"
          className="w-full rounded-xl border border-white/10 my-6"
        />
        <ul>
          <li>Reduced model node counts and improved LOD switching</li>
          <li>Reduced unnecessary shadow rendering and introduced additional object instancing</li>
          <li>Reworked parts of the cockpit model structure to lessen camera-panning stutters</li>
        </ul>

        <h2>EFB Improvements</h2>
        <ul>
          <li>Added an advisory when time acceleration is active</li>
          <li>Corrected landing distances produced by the landing-performance calculator</li>
          <li>Improved Navigraph authentication persistence between flights</li>
          <li>Changed default GPU auto-disconnection behaviour to prevent tripped circuit breakers and AUTO FLIGHT FAULT advisories upon pushback.</li>
        </ul>

        <h2>Flight-Model Refinements</h2>
        <ul>
          <li>Adjusted landing-gear compression for more realistic ground handling</li>
          <li>Reduced excessive gear softness during takeoff and landing</li>
        </ul>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/news/update-2026-08-06-p4-1.png"
          alt="Sentry and data collection overview visual"
          className="w-full rounded-xl border border-white/10 my-6"
        />

        <h2>What&apos;s Coming in v1.0.4</h2>
        <p>
          We&apos;ve wrapped up v1.0.4 for the Synaptic A220 and have submitted the build to Microsoft. The changelog for this patch is now available, and we are expecting release next week! This update continues our focus on stability, performance and everyday usability. Highlights currently include:
        </p>
        <ul>
          <li>A new Terrain Map Launcher with tray-app controls and more accessible troubleshooting</li>
          <li>Further passes on the ND and EICAS to seek out performance improvements</li>
          <li>FMS and navigation fixes covering route drawing, intercept logic, discontinuities and top-of-descent behaviour</li>
          <li>Engine and APU fixes, including abnormal engine-start indications and APU sequencing issues</li>
          <li>Cockpit indication corrections across the PFD, TCAS, radios and aircraft-information pages</li>
          <li>Improved performance on the EFB LOADSHEET page</li>
          <li>Additional logic corrections, including preventing aircraft doors from being opened in flight</li>
          <li>Model node count reductions and art optimizations targeting performance</li>
          <li>More improvements detailed at <a href="https://docs.synapticsim.com/changelog" target="_blank" rel="noreferrer">https://docs.synapticsim.com/changelog</a></li>
        </ul>

        <h2>Looking Forward</h2>
        <p>
          We&apos;re already hard at work on v1.0.5, and are actively hunting down new bugs and making improvements to our flight management and guidance systems. Here's what you can look forward to:
        </p>
        <ul>
          <li>Improved handling of constraints on complicated procedures with more pilot involvement</li>
          <li>Improved guidance in holding patterns</li>
          <li>Better missed approach handling</li>
          <li>More realistic FMA mode sequencing and transitions</li>
          <li>More accurate time enroute, fuel burn, and deceleration predictions</li>
          <li>Fixed wildly incorrect distance and time estimates for flight plan destination</li>
          <li>Automatically displayed non-normal checklists based on CAS messages</li>
          <li>Support for deferred, follow-on, and timed items in checklists</li>
          <li>More exposed varaibles and tighter integration with third-party software</li>
        </ul>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src="/screenshots/31.png"
            alt="Synaptic A220 flight deck"
            className="w-full rounded-xl border border-white/10 my-6"
        />

        <h2>Sentry &amp; Data Collection</h2>
        <p>
          To help us quickly diagnose and fix issues, we implemented Sentry on the Synaptic A220 to assist with development and testing. Sentry is a self-hosted software platform that provides telemetry and release health monitoring capabilities.
        </p>
        <p>
          We integrated the Sentry SDK into the Synaptic A220 avionics code to help us capture diagnostic information when users experience issues such as:
        </p>
        <ul>
          <li>WASM crashes</li>
          <li>MFW soft crashes</li>
          <li>Other runtime errors</li>
        </ul>
        <p>
          When a crash occurs, Sentry allows us to see the exact line of code that triggered the issue. This is incredibly valuable for the programming team to quickly turnaround issues and push out patches quicker than conventional workflows where the developer will try and reproduce the issue to eventually fix it.
        </p>
        <p>
          Without it, we are often left guessing at potential causes or relying on users to manually retrieve developer logs. Sentry also tracks session health (via “heartbeat” pings) so we can compare aircraft versions and measure stability improvements between releases.
        </p>
        <p>
          We have changed how this works from initial release, and we’d like to detail how things will be going forward. In prior versions, when the aircraft was loaded and periodically during a session, a basic “session heartbeat” was sent. If a crash occurred, a payload was sent containing:
        </p>
        <ul>
          <li>The error message</li>
          <li>The source line of code responsible</li>
          <li>Platform (2024-PC, 2024-Xbox, 2020-PC, 2020-Xbox)</li>
          <li>Aircraft version</li>
          <li>Timestamp</li>
          <li>A unique user identifier (UUID) which previously was the user&apos;s gamertag.</li>
        </ul>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/news/update-2026-08-06-p5-1.png"
          alt="Telemetry policy changes visual"
          className="w-full rounded-xl border border-white/10 my-6"
        />

        <p>
          As a self-hosted system, all data remains strictly under Synaptic Simulations&apos; direct control at all times and is not accessed by any other third parties.
        </p>
        <p>
          After conducting an internal review, we believe we need to do this in a better way. As of v1.0.3, Sentry is no longer active on the Synaptic A220 and all previous crash data collected has been deleted. Sentry will continue to be inactive for v1.0.4.
        </p>
        <p>
          Firstly, we believe the use of the Xbox gamertag as the unique user identifier is not appropriate and as a result, all telemetry data will be strictly anonymous moving forward.
        </p>
        <p>
          Secondly, starting with v1.0.5, <strong>users will be presented with a clear opt-in screen within the aircraft</strong> before any telemetry is activated. <strong>No data will be transmitted unless consent is provided.</strong>
        </p>

        <p>
          <strong>There is no crash data collected for the duration of v1.0.3 and v1.0.4</strong>, so please report issues conventionally through the issues board on our Discord server and provide as much information as possible to help us replicate your bugs.
        </p>
        <p>
          We want to clearly apologise for the oversight. As Sentry was a core part of our testing and internal QA process, we overlooked that gamertags were being captured as part of this process. The focus was on the crash data, error messages, pertaining code lines and stability metrics.
        </p>
        <p>
          This was a learning curve, and we are committed to improving our processes as we grow. Our intention has always been to diagnose and resolve customer issues efficiently, and to handle any data involved with care and respect for user privacy.
        </p>
        <p>
          Crash telemetry is invaluable for performance and stability improvement and we are committed to doing it correctly and transparently. Sentry helps our team aggregate commonly reported issues and provides a clear workflow to resolution, leading to faster updates for all customers.
        </p>
        <p>
          We&apos;d like to restate our commitment to learning, listening and working on doing better to deliver the best A220 experience for you all. Our team is always eager to help with your A220 concerns and questions, and we hope our next series of updates through the weeks improve the A220 user experience for everyone!
        </p>
        <p>
          Regards,<br />Synaptic Team
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screenshots/30.png"
          alt="Synaptic A220 sign-off image"
          className="w-full rounded-xl border border-white/10 my-6"
        />
      </>
    ),
  },

  // ── FSExpo Update ──────────────────────────────────────────────────────────
  'fsexpo-update': {
    slug: 'fsexpo-update',
    date: 'June 24, 2025',
    category: 'Development Update',
    title: 'Synaptic A220 – FSExpo Update',
    readTime: '4 min read',
    content: (
      <>
        <p>
          As development on the Synaptic A220 continues at full throttle, we&apos;re back with a short follow-up update to showcase what the team has been working on over the past few months. From new system implementations to visual polish and community-facing features, June has been a month of tightening bolts and turning new corners. We&apos;re excited to share that progress with you here — and for those attending FSExpo, in person at our booth!
        </p>
        <p>
          Since the April update, and especially following our livestream in early June, we&apos;ve been hard at work incorporating community feedback and addressing internal review notes. With each development milestone, we&apos;ve been able to take a more refined look at how the aircraft behaves, performs, and feels in the simulator. We&apos;re happy to say that we&apos;re in a strong position moving forward. Thanks to continuous testing and a rapid iteration cycle, bugs are being identified and resolved daily, and every new build pushes us closer to the polished experience we&apos;re aiming to deliver. At the same time, development hasn&apos;t slowed. New features and functionality are being layered in alongside ongoing fixes, ensuring steady forward momentum as we close in on key milestones.
        </p>

        <h2>Systems</h2>
        <p>
          In our June development stream, we shared a revised roadmap outlining the final phases ahead of release. We remain committed to adhering to this roadmap, with system deep-dives planned for July through September covering electrical systems, display logic, flight data paths, and flight control/autopilot behavior.
        </p>
        <p>
          In line with the roadmap, we&apos;ve been focusing on polishing each of these systems in preparation for their spotlight updates. The electrical system has seen major progress, including a fully simulated APU that mirrors real-world behavior with voltage and frequency ramp-up and proper bus transfer logic. This ties directly into our updated hydraulic and fuel systems, which have been further refined for more accurate integration and behavior under both normal and failure conditions. We&apos;ve also worked on integrating various cockpit zone lighting elements with the electrical system, ensuring they behave accurately in response to power availability and switch states, further bringing the flight deck to life in both day and night operations.
        </p>
        <p>
          Bringing the aircraft to life goes beyond core functionality, and in recent weeks we&apos;ve made significant strides in layering subtle, interconnected behaviors across all major systems. Synoptic pages such as hydraulics, fuel, and electrical now dynamically respond to aircraft state and system interactions, showcasing cascading behaviors in line with our emergent modeling philosophy.
        </p>
        <p>
          Under the hood we&apos;ve also made broad performance improvements, resolving memory leaks, optimizing system architecture, and aligning code with our newer, more efficient implementations. These updates contribute to a smoother, more stable in-sim experience across all systems.
        </p>
        <p>
          On the navigation front, the previously showcased Navigraph integration continues to evolve. The A220 now fully supports SimBrief flight plan uplink directly into the FMS, enabling a seamless and realistic preflight setup. Navigraph charts can also be accessed directly on the aircraft&apos;s display units (DUs), allowing pilots to reference procedures and airport diagrams without leaving the cockpit. This same navdata powers the onboard airport navigation system, which activates automatically as the ND range is reduced, seamlessly toggling between airport layouts and terrain maps based on current settings.
        </p>
        <p>
          The electronic flight control system, first showcased in the June stream, has also seen key improvements, particularly in the areas of speed trim logic and pitch stability. These changes integrate directly with our newly developed autothrottle system and expanding autoflight modes, resulting in a more cohesive and realistic flight experience across the full flight envelope.
        </p>
        <p>
          Many of these additions, details, and quirks can be explored live on the A220 at FSExpo — so if you&apos;re attending, be sure to stop by and experience it firsthand! For everyone else, we&apos;ll be diving into each major system in more depth through our upcoming monthly updates, culminating in a cohesive and transparent lead-up to release.
        </p>

        <h2>Visuals</h2>
        <p>
          As work wraps up on the visual side of the A220, we&apos;ve been addressing feedback from both the community and our trusted team of pilots, engineers, and testers. From fixing reported bugs to enhancing small visual details, we&apos;ve focused on ensuring a consistent, high-fidelity experience across both Microsoft Flight Simulator 2020 and 2024.
        </p>

        <h2>Sounds</h2>
        <p>
          We&apos;ve been intentionally quiet about one major component… until now. We&apos;re excited to announce that we&apos;re working with <strong>Echo19</strong> to bring the Synaptic A220&apos;s soundscape to life with industry-leading realism! Known for their exceptional work in flight sim audio, Echo19 brings proven talent and expertise, and we&apos;re proud to have the A220 join their growing track record.
        </p>
        <p>
          Sound development is already underway, using in-house recordings from the real A220. Each sound source is being placed precisely where it belongs — from the sharp, tactile click of overhead Korry switches to the signature &ldquo;whale&rdquo; spool-up of the A220&apos;s PW1500G engines. Our goal is to deliver a deeply immersive and spatially accurate audio experience, resulting in a sensational visual and auditory package from the Synaptic A220.
        </p>

        <h2>Closing Remarks</h2>
        <p>
          Thank you for following along with this month&apos;s late June development update. We continue to make steady progress across all major areas of the Synaptic A220, with ongoing refinement, expanded system depth, and new feature integration driving us toward release.
        </p>
        <p>
          If you haven&apos;t already, watch the <a href="https://www.youtube.com/watch?v=TeaZJGdgy_c" target="_blank" rel="noreferrer">FSExpo Trailer of the Synaptic A220</a>!
        </p>
        <p>
          FSExpo attendees can expect a closer look at the aircraft in its current state, and we look forward to speaking with every one of you at our stand with iniBuilds at Booth 401! While future updates will continue to break down key systems and development milestones in detail, this wraps up our update cycle for June. We look forward to sharing more with you soon in July!
        </p>
      </>
    ),
  },

  // ── April 2025 Update ──────────────────────────────────────────────────────
  'april-2025-update': {
    slug: 'april-2025-update',
    date: 'April 29, 2025',
    category: 'Development Update',
    title: 'Synaptic A220 – April 2025 Update',
    readTime: '10 min read',
    content: (
      <>
        <p>
          As we continue to shift things into ever-increasing gears here at the Synaptic development team, we&apos;d like to share some of the exciting new progress made on the Synaptic A220 Airliner for Microsoft Flight Simulator 2020 and 2024. Some of you may have already seen some of the excitement from our developers and providers spill out into our public Discord channels and social media, and now is our chance to fill you in on what has us so pumped!
        </p>
        <p>
          Before we get into the gritty details, we&apos;d like to take the chance to thank our dedicated team of pilots, engineers, and ground service workers, as well as iniBuilds for their continued support in getting this product closer to the finish line. From the very beginning of our partnership, this project has been about bringing together the best of both teams. We are working closely with iniBuilds to ensure that every element of the A220 exceeds the expectations of the community, both now and into the future. Whether it is fine-tuning performance characteristics with precision or creating a polished, immersive experience from the moment you load in, our shared goal is to deliver an aircraft that feels cohesive, high-quality, and, above all, truly enjoyable to fly.
        </p>

        <h2>Visuals</h2>
        <p>
          Over the past two years, the visuals team at Synaptic has worked meticulously to recreate every aspect of the A220 with a focus on delivering exceptional accuracy and attention to detail. Leveraging high-fidelity 3D scans, extensive reference data, and the latest development techniques, we&apos;ve re-built the A220 model from the ground up — striving to capture the nuances of the real-world A220. The result? A gorgeous, true-to-life model that brings out every characteristic of the A220 while remaining performant.
        </p>
        <p>
          However, a great visual model is only half the story. To achieve full visual authenticity and ensure the aircraft comes to life within the simulator, exceptional texturing and asset integration are just as critical. The team at iniBuilds have brought their expertise to several key areas of development for this project, including 3D asset integration for both Microsoft Flight Simulator 2020 and 2024, detailed texturing, flight modeling, sound design, and the creation of the electronic flight bag (EFB).
        </p>
        <p>
          The iniBuilds art team has been hard at work integrating the Synaptic 3D model into the simulator, meticulously UV mapping and texturing the aircraft inside and out, and refining essential visual elements such as lighting, materials, and special effects — all to ensure a truly immersive and high-fidelity experience.
        </p>
        <p>
          Diving deeper into the visuals, the A220 is an aircraft full of subtle nuances and unique design features. We dedicated significant development effort to capturing every detail, ensuring that each surface, panel, and major component is modeled with uncompromised precision and brings the aircraft to life.
        </p>
        <p>
          Rivets marked with their correct part numbers and position, decals showing appropriate wear across surfaces, or wiring that accurately follows the real-world contours of the aircraft — these are only part of the story of how the Synaptic A220 represents a true no-compromise approach to quality.
        </p>
        <p>
          The Synaptic A220 features extensively detailed and richly crafted exterior and interior models, including a fully modeled passenger cabin. A wide range of interactive components — such as openable engine cowlings, APU maintenance doors, avionics bays, and maintenance panels throughout the airframe — have also been carefully designed to bring a new level of immersion to the experience.
        </p>

        <h2>Systems: Emergent Behavior &amp; Failures</h2>
        <p>
          Every team has their own interesting ways of developing complex systems and modeling intricate behaviors or scenarios, and we&apos;ve no shortage of that here.
        </p>
        <p>
          Our first step when starting any system, unsurprisingly, is to gather all of the reference material we already have, and try to understand the foundational structure of the system. With the keyword being <em>try</em>, we then bounce countless questions and ideas off our pilots, engineers, and ground service workers, going back and forth in highly technical discussions about the smallest of minutiae until we are confident that we have filled in gaps in our understanding of the system.
        </p>
        <p>
          What usually ends up happening next is that we mimic the physical structure of the system in code with as much detail as is practical. This entails modeling almost every computer, component, ARINC 429 bus, and discrete or analog signal that is documented in operational and technical training manuals. We find that this gives us the best chance at encapsulating the complexities and nuances involved in the aircraft&apos;s systems. With performance and maintainability in mind, we then consider how we can simplify parts of the system without sacrificing the complexity we seek to model, such as coalescing identical, redundant computers into one code path.
        </p>
        <p>
          The end result of this process is something we like to refer to as <strong>emergent behavior</strong>. In essence, it grants us the ability to realistically model many non-normal states without having to explicitly account for them. These states emerge naturally due to failed or degraded components somewhere else in the chain, and from the logic of individual components. We can simply fail the primary flight control computers and watch the error cascade naturally through the components and data channels. This, of course, doesn&apos;t account for every scenario, but it gives us a strong foundation for non-normal operations while also accounting for the core behavior of normal flight conditions.
        </p>

        <h2>More Systems Overview</h2>
        <p>
          Behind the scenes, the Synaptic A220 is powered by a highly detailed simulation of the aircraft&apos;s internal architecture. A total of <strong>646 components</strong> have been modeled so far, covering everything from electrical and data buses to major systems like avionics computers, generators, and more. Our systems architecture has been carefully optimized, with each simulation tick currently processing in under 1 ms, ensuring smooth performance.
        </p>
        <p>
          To further support ongoing development and future maintenance, we have also developed custom in-sim instrumentation and visualization tools, providing a superior debugging environment — a major asset for quickly resolving any issues discovered post-release.
        </p>
        <p>
          The electrical system is one of the most intricate and essential systems onboard the A220, tying together nearly every other subsystem onboard. This system has been fully overhauled to simulate real-world voltage and current flow across every connection, with <strong>368 components</strong> and <strong>995 connections</strong> currently represented in the simulation. Our model fully reflects the aircraft&apos;s primary and secondary power distribution architectures, including proper communication between controllers across the appropriate buses. Every circuit breaker and solid-state power controller (SSPC) has been included — 256 circuit breakers and 636 SSPCs in total — with custom logic applied where appropriate to replicate dynamic behaviors.
        </p>
        <p>
          Avionics complexity has also been carefully captured. The real-world A220 makes use of several communication protocols across its network, including ARINC-429, CAN, TTP, discrete and analog signals, and AFDX, a high-reliability Ethernet-based system. We have worked to simulate these data pathways faithfully while balancing overall performance. This includes modeling key systems like the Integrated Processing System (IPS), Data Concentration System (DCS), and a network of interconnected computers that coordinate critical data flow between system controllers, pilot inputs, and cockpit displays.
        </p>
        <p>
          Integration work has also extended to the aircraft&apos;s fuel and hydraulic systems, which have been updated to align with the new electrical and avionics frameworks. Additionally, the Auxiliary Power Unit (APU) has been substantially reworked, now featuring a separate controller and a dedicated engine model designed to match real-world operating behavior, including appropriate failure scenarios such as hung starts and shutdown irregularities.
        </p>

        <h2>Custom Flight Control System</h2>
        <p>
          Given the A220&apos;s start as a Bombardier project, it should come as no surprise that the flight control laws are not what you&apos;d typically find on an Airbus. The engineers don&apos;t even call them <em>laws</em>, opting for the term <em>modes</em> instead. On one hand, you have the hard flight envelope limits that you&apos;d expect from any other contemporary Airbus craft; on the other, you have speed-stable pitch control, additional soft envelope limits, and three different direct modes.
        </p>
        <p>
          We&apos;ve been diving deep into the electronic flight control system and its associated modes, attempting to capture the nuanced augmentations that the system provides. We&apos;ve learned, for example, that the elevators will pitch downward to provide extra downforce on the front landing gear during the takeoff roll, and that the ailerons will pitch upward to provide extra drag and lift reduction during landing.
        </p>
        <p>
          We are currently in the midst of implementing this system from scratch, with a focus on applying the principles of emergent behavior, in addition to well-established control theory paradigms, in order to provide a realistic experience when hand-flying the aircraft. As we fine-tune the various protections and augmentations with the help of pilot feedback, we hope to bring you more information to prepare you for your time in the cockpit.
        </p>

        <h2>Navigational Data</h2>
        <p>
          Throughout much of the development of the A220, we have been working with Navigraph&apos;s navigational database for its ease of use and incredible depth. It has allowed us to implement many of the features found in the map and flight management applications without worrying about having the necessary data. This is, of course, wildly unsustainable for the more casual users who are satisfied with default navigational data.
        </p>
        <p>
          Part of our efforts have been in developing an interface that allows us to seamlessly switch between Navigraph&apos;s and the simulator&apos;s default navigational data. While in theory this can be done ad-hoc without any effect on the integrity of the flight plan, we intend to take a more realistic approach and have these options available on the ground through the built-in maintenance pages, just as though you were an airline technician going in to update the database. Whilst this is all we have in terms of maintenance pages for now, we hope to break the industry trend of exclusively using the EFB to manage aircraft systems and offload as many of these tasks as possible to the maintenance application.
        </p>

        <h2>Multifunction Keyboard Panel</h2>
        <p>
          More recently, we&apos;ve worked on recreating the Multifunction Keyboard Panel, abbreviated as MKP, which is the primary way for pilots to enter data into the various functions in the avionics suite. This marks the fourth custom font that we&apos;ve had to design for this aircraft, and despite its simple look, it was hardly the easiest of the bunch. Since we also drew the subtle dot matrix behind the text, and even the wires that connect to each row and column, the font had to fit very exact dimensions to align with the background grid.
        </p>
        <p>
          The MKP ties in seamlessly with our existing input system and indicates what is currently in the scratchpad. Text can be entered by pressing the physical alphanumeric buttons on the panel, using your own keyboard with the keyboard input mode, or by clicking copy-able fields on the displays. With text in the scratchpad, the cursor becomes &ldquo;loaded&rdquo; and displays with a cyan box. Clicking into any input field will then enter the text and subject it to any relevant formatting rules, with improperly formatted text displaying an error message directly below the input field and on the MKP.
        </p>

        <h2>Crew Alerting: the CAS in EICAS</h2>
        <p>
          From innocent greetings from developers to shameless rick rolls, our EICAS system has seen many iterations throughout the years, and we&apos;ve finally landed on one that remains beautifully simple without sacrificing on realism.
        </p>
        <p>
          All CAS messages are processed by the aircraft&apos;s data concentration system, just as they are in real life, and are triggered by discrete or ARINC 429 buses routed from the relevant systems in line with our principles of emergent behavior. We&apos;re actively tracking the messages we&apos;ve already hooked up to systems logic and the ones we have yet to tackle, and hope to implement as many as possible as we fill in the remaining systems.
        </p>

        <h2>Plug &amp; Play Checklists</h2>
        <p>
          Our electronic checklists have been designed from the ground up to be easily creatable and modifiable by the user, which we hope will stimulate the community to share airline-specific procedures. We also foresee this being an innovative way for virtual airlines to provide a more custom experience for their pilots.
        </p>
        <p>Every part of the format is intended to be easy to use and understand, and it begins by using the well-known JSON format. The following items are supported:</p>
        <ul>
          <li><strong>Action Items</strong> provide the core &ldquo;checklist&rdquo; functionality, and can either be manually selected or automatically sensed by reading aircraft state.</li>
          <li><strong>Conditional Items</strong> prompt the pilot to select between YES or NO, which then changes which items will be required to mark the checklist as complete.</li>
          <li><strong>Multi-Select Items</strong> are an extension of conditionals, and allow the configuration to specify two or more options with custom labels.</li>
          <li><strong>Free Text Items</strong> simply display cautionary or advisory messages between the other kinds of items.</li>
        </ul>

        <h2>Closing Thoughts</h2>
        <p>
          Thank you to everyone who has read this far and remained invested in the future of this project. We recognize that we&apos;ve been quieter than we would have liked, but we hope today&apos;s brief showcase — a prelude to a much larger update coming in May — has offered a glimpse of what&apos;s to come.
        </p>
        <p>
          We want to reiterate that we are fully committed to delivering the definitive A220 experience for Microsoft Flight Simulator 2020 and 2024, and we sincerely hope you&apos;ll continue this journey with us as we bring it to life.
        </p>
        <p>
          Finally, we would like to extend our thanks once again to iniBuilds for their outstanding partnership and collaboration.
        </p>

        <h2>Release Date</h2>
        <p>
          As outlined in our original development plan, the Synaptic A220 is scheduled to release for both Microsoft Flight Simulator 2020 and 2024, with no date announced as of yet. To reiterate the project&apos;s launch plans: the Synaptic A220 will be available on both the iniBuilds Store and Microsoft Marketplace from day one. The release will occur in two phases: first with the launch of the A220-300 base package, followed by the A220-100 as a free update alongside additional quality-of-life improvements.
        </p>
        <p>
          We will soon announce full details for the upcoming development stream in May, where we invite you to join us in the cockpit for a deeper look across all aspects of the aircraft&apos;s development. We intend to provide a more detailed release timeline for you then.
        </p>
        <p>For now, we hope you&apos;ve enjoyed this update, and we sincerely thank you for your continued support. We look forward to welcoming you aboard the Synaptic A220.</p>
      </>
    ),
  },

  // ── State of Avionics 2024 ─────────────────────────────────────────────────
  'state-of-avionics-2024': {
    slug: 'state-of-avionics-2024',
    date: 'April 29, 2024',
    category: 'Development Update',
    title: 'State of Avionics Update | Synaptic A22X',
    readTime: '2 min read',
    content: (
      <>
        <p>
          Join Mike, our lead avionics developer at Synaptic, on this short but informative update providing insight into some of the new avionics feature additions on the Synaptic A22X!
        </p>
        <p>
          This short feature review covers the Synaptic ACE software, CPDLC integration, A220 checklists and graphical flight planning systems.
        </p>
        <div className="mt-6">
          <a
            href="https://forum.inibuilds.com/topic/22893-state-of-avionics-update-synaptic-a22x/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Watch the full video update on the iniBuilds forum
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </>
    ),
  },

  // ── Project Future Statement ───────────────────────────────────────────────
  'project-future-statement': {
    slug: 'project-future-statement',
    date: 'January 30, 2024',
    category: 'Announcement',
    title: 'Statement from Synaptic Simulations – Synaptic A22X Project Future',
    readTime: '2 min read',
    content: (
      <>
        <p className="italic text-white/60 mb-6">To our dedicated community,</p>
        <p>
          We&apos;d first like to take a moment to thank all of you for your continued support throughout our development of the Synaptic A22X. The enthusiasm you have consistently shown in our server, both incidentally and in reaction to development updates, and on our social media platforms, gives us the motivation to continue developing this project. We are still eagerly working on bringing you a quality product, and we&apos;d like to provide an update on some high-level changes being made to the project.
        </p>
        <p>
          We have collectively decided to move away from the free and open-source software model and instead publish the Synaptic A22X for Microsoft Flight Simulator as a paid add-on. This decision comes out of a realization of the project&apos;s potential as well as the ever-growing development demands during often busy and stressful times for our team.
        </p>
        <p>
          We aren&apos;t embarking on this new chapter alone, and we are thrilled to announce that we are continuing development jointly with the support of <strong>iniBuilds</strong>! Through this collaboration, we will elevate the Synaptic A22X to new heights with regards to quality in order to bring you the A220 experience without compromise, all in a more expedited timeframe as compared to self-publishing under a freeware model.
        </p>
        <p>
          In addition to releasing for the desktop edition of Microsoft Flight Simulator, we are excited to announce that the Synaptic A22X will finally be coming to the <strong>Xbox edition</strong> of Microsoft Flight Simulator as well! The desktop edition of the Synaptic A22X will be made available exclusively through the iniBuilds Store, and the Xbox edition through the Microsoft Marketplace. The initial release will be the A22X-300, and the A22X-100 variant and ACJ will arrive later as a free upgrade to customers of the base package once they are available.
        </p>
        <p>
          We understand any unfavorable feelings you may have toward this decision, as it was a tough one for us to make knowing the support you have all given us with the promise of a free and open-source add-on. We hope that you will remain committed to this project, as our commitment to deliver the best A220 experience remains steady.
        </p>
        <p>
          A &ldquo;frequently asked questions&rdquo; article will be published in the very near future, but we encourage the community to inquire about details regarding this change.
        </p>
        <p className="mt-8 text-white/60 italic">
          Thank you for being a part of our journey,<br />
          <span className="font-semibold text-white not-italic">Synaptic Admin Team</span>
        </p>
      </>
    ),
  },

};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: 'Not Found' };
  return {
    title: article.title,
    description: article.title + ' | Synaptic Simulations',
  };
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const categoryColors: Record<string, string> = {
    'Development Update': 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    Announcement: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  };

  return (
    <div className="pt-16">
      <div className="section-container py-24 max-w-3xl">
        {/* Back */}
        <Link href="/news" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-12">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          All updates
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                categoryColors[article.category] ?? 'text-white/50 bg-white/5 border-white/10'
              }`}
            >
              {article.category}
            </span>
            <span className="text-sm text-white/30">{article.date}</span>
            <span className="text-white/20">·</span>
            <span className="text-sm text-white/30">{article.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Body */}
        <div className="prose-article">
          {article.content}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
          <Link href="/news" className="text-sm text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to all updates
          </Link>
          <a
            href={`https://forum.inibuilds.com/forum/405-announcements/`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            View on iniBuilds Forum ↗
          </a>
        </div>
      </div>
    </div>
  );
}
