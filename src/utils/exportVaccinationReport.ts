import { jsPDF } from "jspdf"

import autoTable from "jspdf-autotable"

export const exportVaccinationReport = (
    records: any[]
) => {
    const doc = new jsPDF()

    doc.setFontSize(20)

    doc.text(
        "Vaccination Report",
        14,
        20
    )

    doc.setFontSize(11)

    doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        30
    )

    autoTable(doc, {
        startY: 40,

        head: [
            [
                "Dependent",
                "Vaccine",
                "Status",
                "Due Date",
                "Administered By",
            ],
        ],

        body: records.map(
            (record) => [
                record?.dependent
                    ?.fullName || "N/A",

                record?.vaccine
                    ?.name || "N/A",

                record?.status || "N/A",

                record?.dueDate
                    ? new Date(
                        record.dueDate
                    ).toLocaleDateString()
                    : "N/A",

                record?.administeredBy ||
                "N/A",
            ]
        ),

        styles: {
            fontSize: 10,

            cellPadding: 4,
        },

        headStyles: {
            fillColor: [124, 58, 237],
        },

        alternateRowStyles: {
            fillColor: [248, 250, 252],
        },
    })

    doc.save(
        `vaccination-report-${Date.now()}.pdf`
    )
}