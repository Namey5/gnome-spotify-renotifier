/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as MessageTray from "resource:///org/gnome/shell/ui/messageTray.js";

const DEBUG = false;

export default class SpotifyRenotifier extends Extension {
  enable() {
    const handleNotification = (
      source: MessageTray.Source,
      notification: MessageTray.Notification,
    ) => {
      if (DEBUG) {
        console.log("New notification:");

        console.log("  Source:");
        for (const property of MessageTray.Source.list_properties()) {
          const key = property.name as keyof MessageTray.Source;
          console.log(`    ${key}: ${source[key]}`);
        }

        console.log("  Notification:");
        for (const property of MessageTray.Notification.list_properties()) {
          const key = property.name as keyof MessageTray.Notification;
          if (property.name in notification) {
            console.log(`    ${key}: ${notification[key]}`);
          }
        }
      }

      if (notification.urgency === MessageTray.Urgency.LOW) {
        notification.urgency = MessageTray.Urgency.NORMAL;
      }
    };

    const allSources = Main.messageTray.getSources();
    for (const source of allSources) {
      if (source.title === "Spotify") {
        source.connect("notification-added", handleNotification);
      }
    }

    Main.messageTray.connect("source-added", (_tray, source) => {
      if (source.title === "Spotify") {
        source.connect("notification-added", handleNotification);
      }
    });
  }

  disable() {}
}
