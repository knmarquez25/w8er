import React from "react";
import Table from "react-bootstrap/Table";
// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const list = [
  {
    name: "Cristiano Ronaldo",
    party: "2",
    phone: "555-555-4352",
    table: "A-1",
    notes: "Hope the food is fresh. ",
    reserveTime: "",
  },
  {
    name: "Johnny Depp",
    party: "2",
    phone: "555-555-4352",
    table: "B-1",
    notes: "Please give me seating in silent place",

    reserveTime: "",
  },
  {
    name: "Christian Bale",
    party: "13",
    phone: "310-135-4352",
    table: "A-2",
    notes: "i'm thinking about dropping danny green for missing that last 3",

    reserveTime: "",
  },
  {
    name: "michael jackson",
    party: "4",
    phone: "123-565-5685",
    table: "B-3",
    notes: "",

    reserveTime: "",
  },
  {
    name: "Harley Quinn",
    party: "4",
    phone: "123-555-7777",
    table: "C-1",
    notes: "Please serve hot food. ",
    reserveTime: "",
  },
  {
    name: "Brad Pitt",
    party: "2",
    phone: "565-565-7894",
    table: "A-4",
    notes: " Hope the food is fresh:)",
    reserveTime: "",
  },
];

const table_style = {
  // width: "20%",
  // margin: "20px",
  // padding: "5px",
};

const Guest = () => (
  <div>
    <h1 style={{ color: "#ffffff" }}>Guest List</h1>

    <ul style={{ listStyle: "none" }}>
      {list.map((item) => {
        return (
          <li key={item.id}>
            <Table
              striped
              hover
              style={table_style}
              css={css`
                background-color: ${({ theme }) => theme.colors.surface};

                tbody {
                  color: ${({ theme }) => theme.colors.onBackground};

                  tr {
                    color: inherit;

                    div {
                      color: inherit;

                      div {
                        color: inherit;

                        p {
                          color: inherit;
                        }
                      }
                    }
                  }
                }
              `}
            >
              <tbody style={{ padding: "15px" }}>
                <tr>
                  <div
                    style={{
                      fontSize: "15px",
                      listStyle: "none",
                      padding: "12px",
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ padding: "12px" }}>
                    <div>
                      Party Size:
                      <p style={{ fontWeight: "bold" }}>{item.party}</p>
                    </div>
                    <div>
                      Table Number:
                      <p style={{ fontWeight: "bold" }}>{item.table}</p>
                    </div>
                    <div>{item.waitTime}</div>
                    <div>
                      Phone Number:
                      <p style={{ fontWeight: "bold" }}>{item.phone}</p>
                    </div>
                    <div>
                      Notes:<p style={{ fontWeight: "bold" }}>{item.notes}</p>
                    </div>
                  </div>
                </tr>
              </tbody>
            </Table>
          </li>
        );
      })}
    </ul>
    <br />
    <br />
    <br />
    <br />
  </div>
);

export default Guest;
