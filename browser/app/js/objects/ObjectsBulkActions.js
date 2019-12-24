/*
 * MinIO Cloud Storage (C) 2018 MinIO, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react"
import { connect } from "react-redux"
import classNames from "classnames"
import * as actions from "./actions"
import { getCheckedList } from "./selectors"
import DeleteObjectConfirmModal from "./DeleteObjectConfirmModal"
import { withI18n } from "react-i18next";
export class ObjectsBulkActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirmation: false
    }
  }
  handleDownload() {
    const { checkedObjects, clearChecked, downloadChecked, downloadObject } = this.props
    if (checkedObjects.length === 1 && !checkedObjects[0].endsWith('/')) {
      downloadObject(checkedObjects[0])
      clearChecked()
    } else {
      downloadChecked()
    }
  }
  deleteChecked() {
    const { deleteChecked } = this.props
    deleteChecked()
    this.hideDeleteConfirmModal()
  }
  hideDeleteConfirmModal() {
    this.setState({
      showDeleteConfirmation: false
    })
  }
  render() {
    const { checkedObjects, clearChecked } = this.props
    const { t, i18n } = this.props;
    return (
      <div
        className={
          "list-actions" +
          classNames({
            " list-actions-toggled": checkedObjects.length > 0
          })
        }
      >
        <span className="la-label">
          <i className="fa fa-check-circle" /> {checkedObjects.length}&nbsp;&nbsp;
          {checkedObjects.length === 1 ? `${t('object')}` : `${t('objects')}`}&nbsp;&nbsp;
          {t('select')}
        </span>
        <span className="la-actions pull-right">
          <button id="download-checked" onClick={this.handleDownload.bind(this)}>
            {" "}
            {t('download')}&nbsp;&nbsp;
            {(checkedObjects.length === 1 && !checkedObjects[0].endsWith('/')) ?
            `${t('object')}`: `${t('zip')}`}{" "}
          </button>
        </span>
        {/* <span className="la-actions pull-right">
          <button
            id="delete-checked"
            onClick={() => this.setState({ showDeleteConfirmation: true })}
          >
            {" "}
            {t('delete')}
            {" "}
          </button>
        </span> */}
        <i
          className="la-close fas fa-times"
          id="close-bulk-actions"
          onClick={clearChecked}
        />
        {this.state.showDeleteConfirmation && (
          <DeleteObjectConfirmModal
            deleteObject={this.deleteChecked.bind(this)}
            hideDeleteConfirmModal={this.hideDeleteConfirmModal.bind(this)}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    checkedObjects: getCheckedList(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadObject: object => dispatch(actions.downloadObject(object)),
    downloadChecked: () => dispatch(actions.downloadCheckedObjects()),
    downloadObject: object => dispatch(actions.downloadObject(object)),
    resetCheckedList: () => dispatch(actions.resetCheckedList()),
    clearChecked: () => dispatch(actions.resetCheckedList()),
    deleteChecked: () => dispatch(actions.deleteCheckedObjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withI18n()(ObjectsBulkActions))
