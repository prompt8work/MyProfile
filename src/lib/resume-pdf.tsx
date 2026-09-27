import path from "node:path";
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { educationLines, formatPeriod, splitRoles, type Resume } from "./resume";

// The downloadable resume, rendered from the same Sanity data as the /resume
// page (see src/lib/resume.ts).
//
// Design follows the original hand-made resume — name with right-aligned
// contact block, accent rule, compact aligned sections — tuned for clarity
// and density (aims for two A4 pages), and kept parseable by applicant
// tracking systems (ATS):
// - Content flows in reading order. Side-by-side layouts are only used where
//   each line still reads correctly on its own (label + value, text + date);
//   never two independent columns of text.
// - Standard section headings ("Professional Experience", "Skills", …).
// - No boxes or per-section rules; only the header accent rule.
// - Body text 9.5pt, nothing below 9pt.
// - Every text style sets its own lineHeight: react-pdf resolves a unitless
//   lineHeight to points against the element's own font size and children
//   inherit that fixed value, so a larger heading inheriting a body
//   lineHeight overlaps the next line.
// - Letter-spacing kept tiny: wide tracking makes PDF text extraction insert
//   spaces ("S U M M A R Y"), which breaks ATS keyword matching.
// - Ligatures off: Inter's "fl" ligature extracts as "f" ("Workfow").
//
// Fonts live in /assets/fonts and are traced into the serverless bundle via
// outputFileTracingIncludes in next.config.ts.

const fontDir = path.join(process.cwd(), "assets/fonts");

Font.register({
  family: "Barlow Condensed",
  fonts: [{ src: path.join(fontDir, "BarlowCondensed-SemiBold.ttf"), fontWeight: 600 }],
});
Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(fontDir, "Inter-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontDir, "Inter-Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontDir, "Inter-SemiBold.ttf"), fontWeight: 600 },
  ],
});
// Never break words across lines with hyphens.
Font.registerHyphenationCallback((word) => [word]);

const ink = "#111827";
const body = "#1f2937";
const muted = "#4b5563";
const accent = "#2f4f73";

const BODY = 9.5;
const LH = 1.42;
const LABEL_COL = 118; // width of the aligned label column (skills)

const s = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: BODY,
    lineHeight: LH,
    color: body,
    paddingTop: 34,
    paddingBottom: 34,
    paddingHorizontal: 40,
    fontFeatureSettings: { liga: false, clig: false },
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 9,
    borderBottomWidth: 2,
    borderBottomColor: accent,
  },
  name: { fontFamily: "Barlow Condensed", fontWeight: 600, fontSize: 30, lineHeight: 1.05, color: ink, letterSpacing: 0.4, textTransform: "uppercase" },
  headline: { fontFamily: "Barlow Condensed", fontWeight: 600, fontSize: 13, lineHeight: 1.2, color: accent, letterSpacing: 0.8, marginTop: 3, textTransform: "uppercase" },
  contact: { fontSize: 9, lineHeight: 1.5, color: muted, textAlign: "right" },
  contactLink: { color: accent, textDecoration: "none" },

  sectionTitle: {
    fontFamily: "Barlow Condensed",
    fontWeight: 600,
    fontSize: 12.5,
    lineHeight: 1.2,
    letterSpacing: 0.6,
    color: accent,
    textTransform: "uppercase",
    marginTop: 11,
    marginBottom: 4,
  },
  para: { fontSize: BODY, lineHeight: LH, marginBottom: 3 },

  labelRow: { flexDirection: "row", marginBottom: 2.5 },
  label: { width: LABEL_COL, fontSize: BODY, lineHeight: LH, fontWeight: 600, color: ink, paddingRight: 8 },
  value: { flex: 1, fontSize: BODY, lineHeight: LH },

  entry: { marginBottom: 7 },
  entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  entryTitle: { flexShrink: 1, paddingRight: 12, fontSize: 10.5, lineHeight: 1.35 },
  entryRole: { fontWeight: 600, color: ink },
  entryOrg: { fontWeight: 500, color: accent },
  entryDate: { fontSize: 9, lineHeight: 1.45, color: muted, flexShrink: 0 },

  bullet: { flexDirection: "row", marginTop: 1.5 },
  bulletMark: { width: 10, fontSize: BODY, lineHeight: LH, color: accent },
  bulletText: { flex: 1, fontSize: BODY, lineHeight: LH },

  subHeading: { fontSize: 9.5, lineHeight: 1.4, fontWeight: 600, color: accent, marginTop: 2, marginBottom: 2 },
  compactRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  compactText: { flexShrink: 1, paddingRight: 12, fontSize: BODY, lineHeight: LH },
  compactRole: { fontWeight: 600, color: ink },

  projectTitle: { fontSize: 10.5, lineHeight: 1.35, fontWeight: 600, color: ink },
  projectTech: { fontSize: 9, lineHeight: 1.4, color: muted, marginBottom: 1 },
  projectTechLabel: { fontWeight: 600, color: accent },

  itemRow: { flexDirection: "row", marginBottom: 2 },
  itemTitle: { fontWeight: 600, color: ink },
  itemDetail: { color: muted },
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View>
      {/* minPresenceAhead keeps a heading from being stranded at a page bottom. */}
      <Text style={s.sectionTitle} minPresenceAhead={50}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bullet} wrap={false}>
      <Text style={s.bulletMark}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  );
}

export function ResumePdf({ resume }: { resume: Resume }) {
  const { featured, earlier } = splitRoles(resume.roles);
  const edu = educationLines(resume);

  return (
    <Document
      title={`${resume.name} — ${resume.title ?? "Resume"}`}
      author={resume.name}
      subject={`Resume of ${resume.name}`}
      keywords={resume.skills.flatMap((g) => g.items).join(", ")}
      creator={resume.name}
      producer={resume.name}
    >
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.name}>{resume.name}</Text>
            {resume.title && <Text style={s.headline}>{resume.title}</Text>}
          </View>
          <View>
            {resume.email && <Text style={s.contact}>{resume.email}</Text>}
            {resume.phone && <Text style={s.contact}>{resume.phone}</Text>}
            {resume.location && <Text style={s.contact}>{resume.location}</Text>}
            {resume.linkedin && (
              <Link src={`https://${resume.linkedin}`} style={[s.contact, s.contactLink]}>
                {resume.linkedin}
              </Link>
            )}
          </View>
        </View>

        {resume.summary.length > 0 && (
          <Section title="Professional Summary">
            {resume.summary.map((p, i) => (
              <Text key={i} style={s.para}>
                {p}
              </Text>
            ))}
          </Section>
        )}

        {resume.skills.length > 0 && (
          <Section title="Skills">
            {resume.skills.map((g) => (
              <View key={g.category} style={s.labelRow} wrap={false}>
                <Text style={s.label}>{g.category}:</Text>
                <Text style={s.value}>{g.items.join(", ")}</Text>
              </View>
            ))}
          </Section>
        )}

        {resume.roles.length > 0 && (
          <Section title="Professional Experience">
            {featured.map((r) => (
              <View key={`${r.company}-${r.startDate}`} style={s.entry}>
                <View style={s.entryHead} wrap={false}>
                  <Text style={s.entryTitle}>
                    <Text style={s.entryRole}>{r.role}</Text>
                    <Text style={s.entryOrg}>
                      {"  |  "}
                      {r.company}
                      {r.location ? `, ${r.location}` : ""}
                    </Text>
                  </Text>
                  <Text style={s.entryDate}>{formatPeriod(r.startDate, r.endDate)}</Text>
                </View>
                {r.highlights.map((h, i) => (
                  <Bullet key={i}>{h}</Bullet>
                ))}
              </View>
            ))}

            {earlier.length > 0 && (
              <View wrap={false}>
                <Text style={s.subHeading}>{resume.earlierRolesHeading || "Earlier Experience"}</Text>
                {earlier.map((r) => (
                  <View key={`${r.company}-${r.startDate}`} style={s.compactRow}>
                    <Text style={s.compactText}>
                      <Text style={s.compactRole}>{r.role}</Text>
                      {`  |  ${r.company}${r.location ? `, ${r.location}` : ""}`}
                    </Text>
                    <Text style={s.entryDate}>{formatPeriod(r.startDate, r.endDate)}</Text>
                  </View>
                ))}
              </View>
            )}
          </Section>
        )}

        {resume.projects.length > 0 && (
          <Section title="Selected Projects">
            {resume.projects.map((p) => {
              // Paragraphs and bullets in display order; the first one stays
              // on the same page as the project heading so a heading is never
              // stranded at the bottom of a page.
              const blocks = [
                ...p.description.map((d, i) => (
                  <Text key={`d${i}`} style={[s.para, { marginTop: 1.5 }]}>
                    {d}
                  </Text>
                )),
                ...p.points.map((pt, i) => <Bullet key={`p${i}`}>{pt}</Bullet>),
              ];
              return (
                <View key={p.name} style={s.entry}>
                  <View wrap={false}>
                    <Text style={s.projectTitle}>{p.name}</Text>
                    {p.tech.length > 0 && (
                      <Text style={s.projectTech}>
                        <Text style={s.projectTechLabel}>{p.techLabel || "Technologies"}: </Text>
                        {p.tech.join(", ")}
                      </Text>
                    )}
                    {blocks[0]}
                  </View>
                  {blocks.slice(1)}
                </View>
              );
            })}
          </Section>
        )}

        {edu.length > 0 && (
          <Section title="Education & Certifications">
            {edu.map((e) => (
              <View key={e.title} style={s.itemRow} wrap={false}>
                <Text style={s.value}>
                  <Text style={s.itemTitle}>{e.title}</Text>
                  {e.detail && <Text style={s.itemDetail}>{`  |  ${e.detail}`}</Text>}
                </Text>
              </View>
            ))}
          </Section>
        )}

        {resume.teaching.length > 0 && (
          <Section title="Teaching">
            {resume.teaching.map((t) => (
              <View key={t.title} style={s.itemRow} wrap={false}>
                <Text style={s.value}>
                  <Text style={s.itemTitle}>{t.title}</Text>
                  {t.description && <Text style={s.itemDetail}>{`  |  ${t.description}`}</Text>}
                </Text>
              </View>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  );
}
