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
import * as actionsBuckets from "./actions"
import { withNamespaces } from 'react-i18next';
export const BucketSearch = (props) => {
  const { t, onChange } = props;
  return (
    <div
      className="input-group ig-dark ig-left ig-search"
      style={{ display: "block" }}
    >
      <input
        className="ig-text"
        type="text"
        onChange={e => onChange(e.target.value)}
        placeholder={t('search1')}
      />
      <i className="ig-helpers" />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: filter => {
      dispatch(actionsBuckets.setFilter(filter))
    }
  }
}

export default connect(undefined, mapDispatchToProps)(withNamespaces('translation')(BucketSearch))
