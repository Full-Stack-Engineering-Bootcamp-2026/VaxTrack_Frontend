import jsPDF from "jspdf"

import autoTable from "jspdf-autotable"

export const exportVaccinationReport = ({
    records,
    complianceRate,
    statusData,
}: any) => {

    const doc = new jsPDF()

    doc.setFontSize(24)

    doc.text(
        "VaxTrack Staff Dashboard Report",
        14,
        20
    )

    doc.setFontSize(11)

    doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        30
    )

    doc.setFontSize(16)

    doc.text(
        "Dashboard Summary",
        14,
        45
    )

    autoTable(doc, {

        startY: 50,

        head: [
            [
                "Completed",
                "Overdue",
                "Upcoming",
                "Compliance",
            ],
        ],

        body: [
            [
                statusData?.completed ?? 0,
                statusData?.overdue ?? 0,
                statusData?.upcoming ?? 0,
                `${complianceRate ?? 0}%`,
            ],
        ],

        styles: {
            fontSize: 11,
            cellPadding: 5,
        },

        headStyles: {
            fillColor: [124, 58, 237],
        },
    })

    doc.setFontSize(16)

    doc.text(
        "Vaccination Records",
        14,
        95
    )

    autoTable(doc, {

        startY: 100,

        head: [
            [
                "Dependent",
                "Vaccine",
                "Status",
                "Due Date",
            ],
        ],

        body: records.map(
            (record: any) => [

                record?.dependent
                    ?.fullName ?? "N/A",

                record?.vaccine
                    ?.name ?? "N/A",

                record?.status ?? "N/A",

                record?.dueDate
                    ? new Date(
                        record.dueDate
                    ).toLocaleDateString()
                    : "N/A",
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
        `vaxtrack-dashboard-report-${Date.now()}.pdf`
    )
}